import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, projectType, timeline, message } = body

    // Validate required fields
    if (!name || !email || !projectType || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Build a clean HTML email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #6B21A8; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Project Inquiry</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0 0;">from Scaleunities Contact Form</p>
        </div>
        <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151; width: 140px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${email}</td>
            </tr>
            ${
              phone
                ? `<tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${phone}</td>
            </tr>`
                : ""
            }
            ${
              company
                ? `<tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Company</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${company}</td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Service</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${projectType}</td>
            </tr>
            ${
              timeline
                ? `<tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Timeline</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${timeline}</td>
            </tr>`
                : ""
            }
          </table>
          <div style="margin-top: 24px;">
            <p style="font-weight: bold; color: #374151; margin-bottom: 8px;">Message:</p>
            <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb; color: #111827; line-height: 1.6;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
        </div>
      </div>
    `

    // Send email using Resend
    const result = await resend.emails.send({
      from: "Scaleunities Contact <onboarding@resend.dev>",
      to: process.env.RESEND_TO_EMAIL || "amirdridi.contact@gmail.com",
      replyTo: email,
      subject: `New Project Inquiry from ${name} - ${projectType}`,
      html: htmlContent,
    })

    if (result.error) {
      console.error("Resend error:", result.error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Email submission error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
