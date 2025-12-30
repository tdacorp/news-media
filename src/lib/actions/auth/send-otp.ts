"use server"

import { z } from "zod"
import { sendRegistrationOtp } from "@/lib/auth/send-registration-otp"

const Schema = z.object({
  identifier: z.string().min(3),
})

export async function sendOtp(input: unknown) {
  const { identifier } = Schema.parse(input)

  try {
    await sendRegistrationOtp(identifier)
    return { success: true }
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Failed to send OTP",
    }
  }
}
