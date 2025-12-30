"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { resendOtp, verifyRegistration, registerUser } from "@/lib/actions/auth"

/* -----------------------------
   TYPES
------------------------------ */

type Phase = "idle" | "registering" | "verifying"

/* -----------------------------
   COMPONENT
------------------------------ */

export default function RegisterPage() {
  const router = useRouter()

  /* ---------- form data ---------- */

  const [form, setForm] = useState({
    name: "",
    username: "",
    identifier: "",
    password: "",
  })

  /* ---------- state ---------- */

  const [phase, setPhase] = useState<Phase>("idle")
  const [error, setError] = useState<string | null>(null)

  /* ---------- otp ---------- */

  const [otpOpen, setOtpOpen] = useState(false)
  const [otp, setOtp] = useState("")
  const [otpError, setOtpError] = useState<string | null>(null)
  const [resendMsg, setResendMsg] = useState<string | null>(null)

  /* -----------------------------
     HANDLERS
  ------------------------------ */

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (phase !== "idle") return

    setError(null)
    setPhase("registering")

    try {
      const res = await registerUser(form)

      if ("error" in res) {
        setError("something wnet wrong")
        setPhase("idle")
        return
      }

      // OTP successfully sent
      setOtp("")
      setOtpError(null)
      setOtpOpen(true)
      setPhase("verifying")
    } catch {
      setError("Registration failed")
      setPhase("idle")
    }
  }

  async function handleVerifyOtp() {
    if (otp.length !== 6) return

    setOtpError(null)

    try {
      const res = await verifyRegistration({
        identifier: form.identifier,
        code: otp,
      })

      if ("error" in res) {
        setOtpError("something went wrong")
        return
      }

      // verified → move on
      router.push("/login")
    } catch {
      setOtpError("Verification failed")
    }
  }

  async function handleResendOtp() {
    setResendMsg(null)
    setOtpError(null)

    try {
      const res = await resendOtp({
        identifier: form.identifier,
      })

      if ("error" in res) {
        setOtpError("something went wrong")
        return
      }

      setResendMsg("Code resent")
    } catch {
      setOtpError("Unable to resend code")
    }
  }

  /* -----------------------------
     RENDER
  ------------------------------ */

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm space-y-4 border p-6 rounded"
      >
        <h1 className="text-xl font-semibold">Create account</h1>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Input
          placeholder="Full name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          required
        />

        <Input
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              username: e.target.value,
            }))
          }
          required
        />

        <Input
          placeholder="Email or phone"
          value={form.identifier}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              identifier: e.target.value,
            }))
          }
          required
        />

        <Input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              password: e.target.value,
            }))
          }
          required
        />

        <Button type="submit" disabled={phase !== "idle"} className="w-full">
          {phase === "registering" ? "Creating…" : "Register"}
        </Button>
      </form>

      {/* -----------------------------
          OTP DIALOG
      ------------------------------ */}

      <Dialog open={otpOpen} onOpenChange={setOtpOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify your account</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enter the 6-digit code sent to <strong>{form.identifier}</strong>
            </p>

            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                {Array.from({ length: 6 }).map((_, i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>

            {otpError && <p className="text-sm text-red-600">{otpError}</p>}

            {resendMsg && <p className="text-sm text-green-600">{resendMsg}</p>}

            <Button
              onClick={handleVerifyOtp}
              disabled={otp.length !== 6}
              className="w-full"
            >
              Verify
            </Button>

            <Button
              variant="ghost"
              onClick={handleResendOtp}
              className="w-full"
            >
              Resend code
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
