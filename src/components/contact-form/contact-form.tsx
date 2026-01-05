"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { sendContactMail } from "@/lib/actions/contact/sendmailcontact"

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formRef = useRef<HTMLFormElement>(null)

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Send us a Message
      </h2>

      {submitted && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-800">
          Thank you! We’ll get back to you soon.
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <form
        ref={formRef}
        action={async (formData) => {
          if (loading) return

          setLoading(true)
          setError(null)

          const res = await sendContactMail(formData)

          if (!res.success) {
            setError(res.error || "Something went wrong. Please try again.")
            setLoading(false)
            return
          }

          formRef.current?.reset()
          setSubmitted(true)
          setTimeout(() => setSubmitted(false), 4000)

          setLoading(false)
        }}
        className="space-y-4 border p-8"
      >
        <fieldset disabled={loading} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              name="name"
              required
              minLength={5}
              placeholder="Your name"
              className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:ring-2 focus:ring-primary outline-none disabled:opacity-60"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:ring-2 focus:ring-primary outline-none disabled:opacity-60"
            />
          </div>

          {/* Phone (UX aligned with server validation) */}
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              name="phone"
              required
              pattern="[6-9][0-9]{9}"
              placeholder="10 digit mobile number"
              className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:ring-2 focus:ring-primary outline-none disabled:opacity-60"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <select
              name="subject"
              required
              className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:ring-2 focus:ring-primary outline-none disabled:opacity-60"
            >
              <option value="">Select subject</option>
              <option value="news">News Tip</option>
              <option value="advertising">Advertising</option>
              <option value="careers">Careers</option>
              <option value="partnership">Partnership</option>
              <option value="complaint">Complaint</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              name="message"
              required
              minLength={10}
              rows={5}
              placeholder="Your message..."
              className="w-full resize-none rounded-lg border border-border bg-background px-4 py-2 focus:ring-2 focus:ring-primary outline-none disabled:opacity-60"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </fieldset>
      </form>
    </div>
  )
}
