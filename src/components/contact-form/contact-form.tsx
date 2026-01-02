"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    setTimeout(() => setSubmitted(false), 4000)

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
  }

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

      <form onSubmit={handleSubmit} className="space-y-4 border p-8">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium mb-2">Subject</label>
          <select
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
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
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message..."
            className="w-full resize-none rounded-lg border border-border bg-background px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <Button type="submit" className="w-full flex items-center gap-2">
          <Send className="w-4 h-4" />
          Send Message
        </Button>
      </form>
    </div>
  )
}
