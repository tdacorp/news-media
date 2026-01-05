"use server"

import nodemailer from "nodemailer"

/* ---------- helpers ---------- */
function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/* ---------- action ---------- */
export async function sendContactMail(formData: FormData) {
  try {
    /* 🔐 ENV CHECK */
    const EMAIL_USER = process.env.EMAIL_USER
    const EMAIL_PASS = process.env.EMAIL_PASS
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL

    if (!EMAIL_USER || !EMAIL_PASS || !ADMIN_EMAIL) {
      return {
        success: false,
        error: "Server email configuration is missing",
      }
    }

    /* 📥 extract + trim */
    const name = String(formData.get("name") || "").trim()
    const email = String(formData.get("email") || "").trim()
    const phone = String(formData.get("phone") || "").trim()
    const subject = String(formData.get("subject") || "").trim()
    const message = String(formData.get("message") || "").trim()

    if (name.length < 5 || name.length > 100) {
      return { success: false, error: "Invalid name" }
    }

    if (!isValidEmail(email)) {
      return { success: false, error: "Invalid email address" }
    }

    if (!/^[6-9][0-9]{9}$/.test(phone)) {
      return { success: false, error: "Invalid phone number" }
    }

    if (message.length < 10 || message.length > 2000) {
      return { success: false, error: "Invalid message length" }
    }

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safePhone = escapeHtml(phone)
    const safeSubject = escapeHtml(subject)
    const safeMessage = escapeHtml(message)

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    })


     // admin mail
    await transporter.sendMail({
      from: `"Teesri Aankh News" <${EMAIL_USER}>`,
      to: ADMIN_EMAIL,
      replyTo: safeEmail,
      subject: `New Contact: ${safeSubject}`,
      html: `
        <p><b>Name:</b> ${safeName}</p>
        <p><b>Email:</b> ${safeEmail}</p>
        <p><b>Phone:</b> ${safePhone}</p>
        <p><b>Subject:</b> ${safeSubject}</p>
        <p><b>Message:</b><br/>${safeMessage}</p>
      `,
    })
      // user mail
    await transporter.sendMail({
      from: `"Teesri Aankh News" <${EMAIL_USER}>`,
      to: safeEmail,
      subject: "We received your message",
      html: `
        <p>Hello <b>${safeName}</b>,</p>
        <p>Regarding:<b>${safeSubject}</b>,</p>
        <p>Thank you for contacting Teesri Aankh News.</p>
        <p>We will get back to you soon.</p>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error("Contact mail error:", error)
    return {
      success: false,
      error: "Unable to send message. Please try again later.",
    }
  }
}
