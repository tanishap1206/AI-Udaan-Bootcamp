import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { otpService } from '@/lib/otpService'

const gmailUser = process.env.GMAIL_USER
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, '')

const transporter =
  gmailUser && gmailAppPassword
    ? nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: gmailUser,
          pass: gmailAppPassword,
        },
      })
    : null

async function sendOtpEmail(email: string, otp: string): Promise<boolean> {
  if (!transporter || !gmailUser) {
    console.error('Gmail SMTP is not configured. Check GMAIL_USER and GMAIL_APP_PASSWORD.')
    return false
  }

  try {
    await transporter.sendMail({
      from: `AI Udaan Bootcamp <${gmailUser}>`,
      to: email,
      subject: 'Your AI Udaan Bootcamp OTP',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0f172a;color:#e2e8f0;border-radius:16px">
          <h2 style="margin:0 0 12px 0;color:#22d3ee">AI Udaan Bootcamp</h2>
          <p style="margin:0 0 20px 0;font-size:16px;line-height:1.6">Use the OTP below to verify your email address and complete your registration.</p>
          <div style="text-align:center;padding:20px;border:1px solid rgba(255,255,255,0.12);border-radius:14px;background:rgba(255,255,255,0.04)">
            <div style="font-size:36px;font-weight:700;letter-spacing:8px;color:#22d3ee">${otp}</div>
          </div>
          <p style="margin:18px 0 0 0;font-size:13px;color:#94a3b8">This OTP is valid for 10 minutes.</p>
        </div>
      `,
    })

    return true
  } catch (error) {
    console.error('Email send error:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.trim()) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Generate and store OTP
    const otp = otpService.generateOTP()
    otpService.storeOTP(email, otp, 10) // 10 minutes expiry

    const emailSent = await sendOtpEmail(email, otp)

    if (!emailSent) {
      otpService.removeOTP(email)
      return NextResponse.json(
        { message: 'Failed to send OTP email. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'OTP sent successfully to your email' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Send OTP error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

