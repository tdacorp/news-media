import { sendEmail } from "../notify"
import { createOtp } from "./otp"

export async function sendRegistrationOtp(identifier: string) {
  const code = await createOtp(identifier, "verify")

  const message = `Your verification code is ${code}. It expires in 5 minutes.`

  const result = identifier.includes("@")
    ? await sendEmail(identifier, "Verify your account", message)
    : { ok: true }

  if (!result.ok) {
    // IMPORTANT: log here
    console.error("[OTP DELIVERY FAILED]", result)
    return { error: "Unable to send OTP" }
  }

  return { success: true }
}
