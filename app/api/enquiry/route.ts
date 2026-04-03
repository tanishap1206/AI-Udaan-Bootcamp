import { NextRequest, NextResponse } from 'next/server'
import { sendToGoogleSheets } from '@/lib/googleSheets'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { name, email, mobile, message, bootcamp } = body

    if (!name || !email || !mobile || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate mobile (10 digits)
    const mobileDigits = mobile.replace(/\D/g, '')
    if (mobileDigits.length !== 10) {
      return NextResponse.json(
        { message: 'Mobile must be 10 digits' },
        { status: 400 }
      )
    }

    // Send to Google Sheets with enquiry data
    // Using the registration format but marking it as enquiry
    const googleSheetResult = await sendToGoogleSheets({
      name,
      email,
      mobile: mobileDigits,
      address: `${message}`, // Full message goes to address for enquiry sheet
      class: bootcamp || 'General Enquiry',
      source: 'Contact Form',
      interest: 'Enquiry',
      date: new Date().toLocaleString('en-IN'),
      type: 'enquiry' as const, // Mark as enquiry type
    })

    if (!googleSheetResult) {
      console.warn('Google Sheets send failed, but continuing')
    }

    return NextResponse.json(
      { 
        message: 'Enquiry submitted successfully ✅',
        data: {
          name,
          email,
          mobile: mobileDigits,
          message,
          bootcamp: bootcamp || 'General Enquiry',
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Enquiry submission error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
