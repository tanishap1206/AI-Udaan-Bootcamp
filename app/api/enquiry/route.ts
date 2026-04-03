import { NextRequest, NextResponse } from 'next/server'
import { sendToGoogleSheets } from '@/lib/googleSheets'
import * as XLSX from 'xlsx'
import * as fs from 'fs'
import * as path from 'path'

const ENQUIRIES_FILE = path.join(process.cwd(), 'public', 'enquiries.xlsx')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Determine which handler to use
    // If 'type' is 'simple', it's from new premium form
    // If 'type' is 'enquiry' or missing, it's from old contact form
    // If it has 'studentType', it was old premium form
    
    if (body.type === 'simple' || (body.studentType === undefined && body.phone !== undefined)) {
      return handleSimpleEnquiry(body)
    } else if (body.studentType !== undefined) {
      // Old premium form
      return handlePremiumEnquiry(body)
    } else {
      // Old contact form
      return handleContactForm(body)
    }
  } catch (error) {
    console.error('Enquiry API error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function handleContactForm(body: any) {
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
  const googleSheetResult = await sendToGoogleSheets({
    name,
    email,
    mobile: mobileDigits,
    address: `${message}`,
    class: bootcamp || 'General Enquiry',
    source: 'Contact Form',
    interest: 'Enquiry',
    date: new Date().toLocaleString('en-IN'),
    type: 'enquiry' as const,
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
      },
    },
    { status: 201 }
  )
}

async function handleSimpleEnquiry(body: any) {
  const { name, email, phone, message } = body

  // Validate required fields
  if (!name || !email || !phone) {
    return NextResponse.json(
      { message: 'Name, email, and phone are required' },
      { status: 400 }
    )
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { message: 'Invalid email format' },
      { status: 400 }
    )
  }

  // Validate phone
  const phoneDigits = phone.replace(/\D/g, '')
  if (phoneDigits.length !== 10) {
    return NextResponse.json(
      { message: 'Phone must be 10 digits' },
      { status: 400 }
    )
  }

  try {
    // Store in Excel (simple enquiry)
    const excelResult = saveSimpleEnquiryToExcel({
      name,
      email,
      phone: phoneDigits,
      message: message || '',
    })

    if (!excelResult) {
      console.warn('Excel save failed')
      // Continue anyway
    }

    // Also send to Google Sheets for backup
    await sendToGoogleSheets({
      name,
      email,
      mobile: phoneDigits,
      address: message || 'No message',
      class: 'Simple Enquiry',
      source: 'Enquiry Form',
      interest: 'General',
      date: new Date().toLocaleString('en-IN'),
      type: 'enquiry' as const,
    }).catch((err) => {
      console.warn('Google Sheets backup failed:', err)
    })

    return NextResponse.json(
      {
        message: 'Enquiry submitted successfully! 🚀',
        data: {
          name,
          email,
          phone: phoneDigits,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Simple enquiry error:', error)
    return NextResponse.json(
      { message: 'Failed to process enquiry' },
      { status: 500 }
    )
  }
}

function saveSimpleEnquiryToExcel(data: {
  name: string
  email: string
  phone: string
  message: string
}): boolean {
  try {
    const SIMPLE_ENQUIRIES_FILE = path.join(process.cwd(), 'public', 'enquiries.xlsx')
    let workbook: XLSX.WorkBook
    let worksheet: XLSX.WorkSheet

    // Read or create file
    if (fs.existsSync(SIMPLE_ENQUIRIES_FILE)) {
      workbook = XLSX.readFile(SIMPLE_ENQUIRIES_FILE)
      worksheet = workbook.Sheets['Enquiries'] || workbook.Sheets[workbook.SheetNames[0]]
    } else {
      workbook = XLSX.utils.book_new()
      worksheet = XLSX.utils.aoa_to_sheet([
        ['Name', 'Email', 'Phone', 'Message', 'Date'],
      ])
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Enquiries')
    }

    // Get existing data
    const existingData = XLSX.utils.sheet_to_json(worksheet) as Record<string, string>[]

    // Add new row
    existingData.push({
      Name: data.name,
      Email: data.email,
      Phone: data.phone,
      Message: data.message,
      Date: new Date().toLocaleDateString('en-IN'),
    })

    // Create new worksheet
    const newWorksheet = XLSX.utils.json_to_sheet(existingData)
    workbook.Sheets['Enquiries'] = newWorksheet

    // Ensure public directory exists
    const publicDir = path.join(process.cwd(), 'public')
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }

    // Write file
    XLSX.writeFile(workbook, SIMPLE_ENQUIRIES_FILE)
    return true
  } catch (error) {
    console.error('Simple Excel save error:', error)
    return false
  }
}
