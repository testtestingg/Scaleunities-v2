import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"

// Basic XSS sanitization
function sanitize(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Email service is not configured" }, { status: 503 })
    }
    const resend = new Resend(apiKey)

    const body = await request.json()
    const { name, email, phone, company, projectType, timeline, budget, message } = body

    // Validate required fields
    if (!name || !email || !projectType || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate message length
    if (message.trim().length < 10) {
      return NextResponse.json({ error: "Message too short" }, { status: 400 })
    }

    // Rate limiting headers check (basic)
    const clientIP = request.headers.get("x-forwarded-for") || "unknown"

    // Sanitize all inputs
    const safeName = sanitize(name)
    const safeEmail = sanitize(email)
    const safePhone = sanitize(phone || "")
    const safeCompany = sanitize(company || "")
    const safeProjectType = sanitize(projectType)
    const safeTimeline = sanitize(timeline || "")
    const safeBudget = sanitize(budget || "")
    const safeMessage = sanitize(message)

    // Build a clean HTML email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #6B21A8 0%, #9333EA 100%); padding: 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">New Project Inquiry</h1>
          <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0 0; font-size: 14px;">from Scaleunities Contact Form</p>
        </div>
        <div style="background: #f9fafb; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 14px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; width: 140px; vertical-align: top;">Name</td>
              <td style="padding: 14px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 14px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; vertical-align: top;">Email</td>
              <td style="padding: 14px 0; border-bottom: 1px solid #e5e7eb; color: #111827;"><a href="mailto:${safeEmail}" style="color: #6B21A8;">${safeEmail}</a></td>
            </tr>
            ${
              safePhone
                ? `<tr>
              <td style="padding: 14px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; vertical-align: top;">Phone</td>
              <td style="padding: 14px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${safePhone}</td>
            </tr>`
                : ""
            }
            ${
              safeCompany
                ? `<tr>
              <td style="padding: 14px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; vertical-align: top;">Company</td>
              <td style="padding: 14px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${safeCompany}</td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding: 14px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; vertical-align: top;">Service</td>
              <td style="padding: 14px 0; border-bottom: 1px solid #e5e7eb; color: #111827;"><span style="background: #f3e8ff; color: #6B21A8; padding: 4px 12px; border-radius: 20px; font-size: 13px;">${safeProjectType}</span></td>
            </tr>
            ${
              safeTimeline
                ? `<tr>
              <td style="padding: 14px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; vertical-align: top;">Timeline</td>
              <td style="padding: 14px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${safeTimeline}</td>
            </tr>`
                : ""
            }
            ${
              safeBudget
                ? `<tr>
              <td style="padding: 14px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; vertical-align: top;">Budget</td>
              <td style="padding: 14px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${safeBudget}</td>
            </tr>`
                : ""
            }
          </table>
          <div style="margin-top: 24px;">
            <p style="font-weight: 600; color: #374151; margin-bottom: 8px;">Message:</p>
            <div style="background: white; padding: 20px; border-radius: 10px; border: 1px solid #e5e7eb; color: #111827; line-height: 1.7; font-size: 14px;">
              ${safeMessage.replace(/\n/g, "<br>")}
            </div>
          </div>
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af;">
            Sent from scaleunities.com contact form | IP: ${clientIP}
          </div>
        </div>
      </div>
    `

    // Send email using Resend
    const result = await resend.emails.send({
      from: "Scaleunities Contact <onboarding@resend.dev>",
      to: process.env.RESEND_TO_EMAIL || "amirdridi.contact@gmail.com",
      replyTo: email,
      subject: `New Project Inquiry from ${safeName} - ${safeProjectType}`,
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
