import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/lib/db"

import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

import { eq } from "drizzle-orm"
import { users } from "@/lib/db/schema/user"

import bcrypt from "bcryptjs"
import { z } from "zod"

import { verifyOtp } from "@/lib/auth/otp"

/* -----------------------------
   SHARED UTILITIES
------------------------------ */

const CredentialsSchema = z.object({
  identifier: z.string().min(3),
  password: z.string().min(8),
})

function isEmail(v: string) {
  return v.includes("@")
}

/* -----------------------------
   NEXTAUTH CONFIG
------------------------------ */

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),

  session: {
    strategy: "jwt",
  },

  providers: [
    /* ---------- OAuth ---------- */

    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),

    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),

    /* ---------- PASSWORD LOGIN ---------- */

    Credentials({
      name: "Credentials",

      async authorize(raw) {
        const parsed = CredentialsSchema.safeParse(raw)
        if (!parsed.success) return null

        const { identifier, password } = parsed.data

        const email = isEmail(identifier)
          ? identifier.toLowerCase().trim()
          : null

        const phone = !email ? identifier.trim() : null

        const [user] = await db
          .select()
          .from(users)
          .where(email ? eq(users.email, email) : eq(users.phone, phone!))

        if (!user) return null
        if (!user.password) return null

        const ok = await bcrypt.compare(password, user.password)
        if (!ok) return null

        // minimal identity only
        return {
          id: user.id,
          email: user.email,
          role: user.role,
          username: user.username,
        }
      },
    }),

    /* ---------- OTP LOGIN ---------- */

    Credentials({
      id: "otp",
      name: "OTP",

      credentials: {
        identifier: { type: "text" },
        code: { type: "text" },
      },

      async authorize(creds) {
        if (
          !creds ||
          typeof creds.identifier !== "string" ||
          typeof creds.code !== "string"
        ) {
          return null
        }

        const identifier = creds.identifier.trim()
        const code = creds.code.trim()

        // 1. Verify OTP (external system)
        const ok = await verifyOtp(identifier, "login", code)
        if (!ok) return null

        // 2. Resolve user
        const email = isEmail(identifier)
          ? identifier.toLowerCase().trim()
          : null

        const phone = !email ? identifier.trim() : null

        const [user] = await db
          .select()
          .from(users)
          .where(email ? eq(users.email, email) : eq(users.phone, phone!))

        if (!user) return null

        // 3. Hand identity to NextAuth → session minted
        return {
          id: user.id,
          email: user.email,
          role: user.role,
          username: user.username,
        }
      },
    }),
  ],

  /* -----------------------------
     JWT + SESSION
  ------------------------------ */

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role ?? "user"
        token.username = user.username ?? null
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = (token.role as "admin" | "user") ?? "user"
        session.user.username = token.username as string | null
      }
      return session
    },
  },

  /* -----------------------------
     ROUTES
  ------------------------------ */

  pages: {
    signIn: "/login",
  },
})
