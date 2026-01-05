"use server"

import nodemailer from "nodemailer"

export async function sendContactMail(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Teesri Aankh News" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: `New Contact: ${subject}`,
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>for:</b> ${subject}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    })

    await transporter.sendMail({
      from: `"Teesri Aankh News" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We received your message",
      html: `
        <p>Hello <b>${name}</b>,</p>
        <p><b>Subject:</b> ${subject}</p>
        <p>Thank you for contacting Teesri Aankh News.</p>
        <p>We will get back to you soon.</p>
      `,
    })
  } catch (error) {
    console.error("Contact mail error:", error)
    throw error 
  }
}