"use server"

import { z } from "zod"
import { verifyOtp } from "@/lib/auth/otp"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema/user"
import { eq } from "drizzle-orm"

const Schema = z.object({
  identifier: z.string().min(3),
  code: z.string().length(6),
})

export async function verifyRegistration(input: unknown) {
  const { identifier, code } = Schema.parse(input)

  const ok = await verifyOtp(identifier, "verify", code)
  if (!ok) {
    return { error: "Invalid or expired OTP" }
  }

  if (identifier.includes("@")) {
    await db
      .update(users)
      .set({ verifiedAt: new Date() })
      .where(eq(users.email, identifier.toLowerCase()))
  } else {
    await db
      .update(users)
      .set({ verifiedAt: new Date() })
      .where(eq(users.phone, identifier))
  }

  return { success: true }
}
