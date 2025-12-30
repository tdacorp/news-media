export const runtime = "nodejs"

import { Resend } from "resend"

const apiKey = process.env.RESEND_API_KEY
const from = process.env.RESEND_FROM

const resend = apiKey ? new Resend(apiKey) : null

export async function sendEmail(
  to: string,
  subject: string,
  body: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!resend || !from) {
    console.log("[EMAIL OTP DEV]", { to, subject, body })
    return { ok: true }
  }

  try {
    const result = await resend.emails.send({
      from,
      to,
      subject,
      text: body,
    })

    console.log("[RESEND SDK RESULT]", result)

    if (result.error) {
      return {
        ok: false,
        error: result.error.message ?? "Resend error",
      }
    }

    return { ok: true }
  } catch (err) {
    console.error("[RESEND SDK THROW]", err)
    return {
      ok: false,
      error: err instanceof Error ? err.message : "sdk failed",
    }
  }
}

export async function sendSms(to: string, body: string) {
  console.log("[SMS OTP]", { to, body })
}
