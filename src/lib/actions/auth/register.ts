"use server"

import { z } from "zod"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema/user"
import { eq } from "drizzle-orm"
import { sendRegistrationOtp } from "@/lib/auth/send-registration-otp"

const RegisterSchema = z.object({
  name: z.string().min(1),
  username: z.string().min(3),
  identifier: z.string().min(3),
  password: z.string().min(8),
})

export async function registerUser(input: unknown) {
  const { name, username, identifier, password } = RegisterSchema.parse(input)

  const email = identifier.includes("@")
    ? identifier.toLowerCase().trim()
    : null

  const phone = !email ? identifier.trim() : null

  // uniqueness
  if (email) {
    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
    if (existing.length) {
      return { error: "Email already registered" }
    }
  }

  if (phone) {
    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.phone, phone))
    if (existing.length) {
      return { error: "Phone already registered" }
    }
  }

  const hash = await bcrypt.hash(password, 12)

  const otpResult = await sendRegistrationOtp(identifier)

  if ("error" in otpResult) {
    return { error: otpResult.error }
  }

  await db.insert(users).values({
    name,
    username,
    email,
    phone,
    password: hash,
    verifiedAt: null,
  })

  return { success: true }
}
