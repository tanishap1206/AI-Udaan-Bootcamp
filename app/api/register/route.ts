import { NextRequest, NextResponse } from 'next/server'
import { addRegistration, checkDuplicateMobile } from '@/lib/excel'
import { sendToGoogleSheets } from '@/lib/googleSheets'

// Validation functions
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validateMobile(mobile: string): boolean {
  return /^\d{10}$/.test(mobile.replace(/\D/g, ''))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      mobile,
      email,
      address,
      class: studentClass,
      aiDomain,
      otherAiDomain,
      source,
      interest,
    } = body

    // Validation
    if (!name || !name.trim()) {
      return NextResponse.json(
        { message: 'Full Name is required' },
        { status: 400 }
      )
    }

    if (!mobile || !validateMobile(mobile)) {
      return NextResponse.json(
        { message: 'Valid 10-digit mobile number is required' },
        { status: 400 }
      )
    }

    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { message: 'Valid email is required' },
        { status: 400 }
      )
    }

    if (!studentClass) {
      return NextResponse.json(
        { message: 'Class selection is required' },
        { status: 400 }
      )
    }

    if (!aiDomain) {
      return NextResponse.json(
        { message: 'Please select a domain to explore using AI' },
        { status: 400 }
      )
    }

    if (aiDomain === 'Other (Please Specify)' && (!otherAiDomain || !otherAiDomain.trim())) {
      return NextResponse.json(
        { message: 'Please specify your domain of interest' },
        { status: 400 }
      )
    }

    if (!source) {
      return NextResponse.json(
        { message: 'Please specify how you heard about us' },
        { status: 400 }
      )
    }

    // Check for duplicate mobile
    if (checkDuplicateMobile(mobile)) {
      return NextResponse.json(
        { message: 'This mobile number is already registered' },
        { status: 400 }
      )
    }

    // Prepare data
    // Use custom value if "Other" is selected, otherwise use selected domain
    const finalAiDomain = aiDomain === 'Other (Please Specify)' ? otherAiDomain?.trim() : aiDomain
    
    const registrationData = {
      name: name.trim(),
      mobile: mobile.replace(/\D/g, ''),
      email: email.trim(),
      address: address?.trim() || '',
      class: studentClass,
      aiDomain: finalAiDomain,
      source: source,
      interest: interest || '',
      date: new Date().toLocaleString('en-IN'),
      type: 'registration' as const, // Send type to distinguish from enquiries
    }

    // Add to Excel
    const success = addRegistration(registrationData)

    if (!success) {
      return NextResponse.json(
        { message: 'Failed to save registration. Please try again.' },
        { status: 500 }
      )
    }

    // Send to Google Sheets (async, don't wait for it to complete)
    sendToGoogleSheets(registrationData).catch((error) => {
      console.error('Failed to sync with Google Sheets:', error)
    })

    return NextResponse.json(
      {
        message: 'Registration successful',
        data: registrationData,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration API error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
