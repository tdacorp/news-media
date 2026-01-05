import { db } from "@/lib/db"
import { otps } from "@/lib/db/schema/otp"
import { eq, and, isNull, gt } from "drizzle-orm"

const OTP_TTL_MINUTES = 5
const MAX_ATTEMPTS = 5

const RESEND_COOLDOWN_MS = 60_000
const MAX_ACTIVE_OTPS = 3

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function createOtp(
  identifier: string,
  purpose: "login" | "verify"
) {
  const now = new Date()

  const active = await db
    .select()
    .from(otps)
    .where(
      and(
        eq(otps.identifier, identifier),
        eq(otps.purpose, purpose),
        isNull(otps.consumedAt),
        gt(otps.expiresAt, now)
      )
    )
    .orderBy(otps.createdAt)

  // too many active OTPs
  if (active.length >= MAX_ACTIVE_OTPS) {
    throw new Error("Too many active OTPs. Try later.")
  }

  // cooldown check
  const latest = active.at(-1)
  if (
    latest &&
    now.getTime() - latest.createdAt.getTime() < RESEND_COOLDOWN_MS
  ) {
    throw new Error("Please wait before requesting another OTP.")
  }

  const code = generateCode()

  const expiresAt = new Date(now.getTime() + OTP_TTL_MINUTES * 60 * 1000)

  await db.insert(otps).values({
    identifier,
    code,
    purpose,
    expiresAt,
  })

  return code
}

export async function verifyOtp(
  identifier: string,
  purpose: "login" | "verify",
  code: string
) {
  const [row] = await db
    .select()
    .from(otps)
    .where(
      and(
        eq(otps.identifier, identifier),
        eq(otps.purpose, purpose),
        isNull(otps.consumedAt),
        gt(otps.expiresAt, new Date())
      )
    )

  if (!row) return false
  if (row.attempts >= MAX_ATTEMPTS) return false
  if (row.code !== code) {
    await db
      .update(otps)
      .set({ attempts: row.attempts + 1 })
      .where(eq(otps.id, row.id))
    return false
  }

  await db
    .update(otps)
    .set({ consumedAt: new Date() })
    .where(eq(otps.id, row.id))

  return true
}
