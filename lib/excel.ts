import * as XLSX from 'xlsx'
import * as fs from 'fs'
import * as path from 'path'

export interface RegistrationData {
  name: string
  mobile: string
  email: string
  address: string
  class: string
  aiDomain: string
  source: string
  interest: string
  date?: string
}

export interface EnquiryData {
  name: string
  email: string
  phone: string
  studentType: string
  interests: string
  goal: string
  city: string
  source: string
  message: string
  consent: string
  date?: string
}

const REGISTRATIONS_FILE = path.join(process.cwd(), 'public', 'registrations.xlsx')
const ENQUIRIES_FILE = path.join(process.cwd(), 'public', 'enquiries.xlsx')

/**
 * Ensure the public directory exists
 */
function ensurePublicDirectory() {
  const publicDir = path.join(process.cwd(), 'public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
}

/**
 * Get the headers for the registration sheet
 */
function getHeaders(): string[] {
  return ['Name', 'Mobile', 'Email', 'Address', 'Class', 'AI Domain', 'Source', 'Interest', 'Date']
}

/**
 * Convert registration data to row array
 */
function dataToRow(data: RegistrationData): (string | undefined)[] {
  const date = data.date || new Date().toLocaleString('en-IN')
  return [
    data.name,
    data.mobile,
    data.email,
    data.address,
    data.class,
    data.aiDomain,
    data.source,
    data.interest,
    date,
  ]
}

/**
 * Check if a mobile number already exists in the file
 */
export function checkDuplicateMobile(mobile: string): boolean {
  try {
    ensurePublicDirectory()
    if (!fs.existsSync(REGISTRATIONS_FILE)) {
      return false
    }

    const file = fs.readFileSync(REGISTRATIONS_FILE)
    const workbook = XLSX.read(file, { type: 'buffer' })
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

    // Skip header row and check mobile column (index 1)
    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === mobile) {
        return true
      }
    }
    return false
  } catch (error) {
    console.error('Error checking duplicate mobile:', error)
    return false
  }
}

/**
 * Add a new registration to the Excel file
 */
export function addRegistration(data: RegistrationData): boolean {
  try {
    ensurePublicDirectory()
    let workbook: XLSX.WorkBook
    let worksheet: XLSX.WorkSheet

    const headers = getHeaders()

    if (fs.existsSync(REGISTRATIONS_FILE)) {
      // Read existing file
      const file = fs.readFileSync(REGISTRATIONS_FILE)
      workbook = XLSX.read(file, { type: 'buffer' })
      worksheet = workbook.Sheets[workbook.SheetNames[0]]
    } else {
      // Create new workbook
      workbook = XLSX.utils.book_new()
      worksheet = XLSX.utils.aoa_to_sheet([headers])
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations')
    }

    // Convert sheet to array of arrays
    const existingData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

    // Add new row
    const newRow = dataToRow(data)
    existingData.push(newRow)

    // Update worksheet
    const updatedWorksheet = XLSX.utils.aoa_to_sheet(existingData)
    workbook.Sheets[workbook.SheetNames[0]] = updatedWorksheet

    // Write to file
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    fs.writeFileSync(REGISTRATIONS_FILE, Buffer.from(buffer))

    return true
  } catch (error) {
    console.error('Error adding registration:', error)
    return false
  }
}

/**
 * Get the headers for the enquiry sheet
 */
function getEnquiryHeaders(): string[] {
  return ['Name', 'Email', 'Phone', 'Student Type', 'Interest Areas', 'Learning Goal', 'City', 'Source', 'Message', 'Consent', 'Date']
}

/**
 * Convert enquiry data to row array
 */
function enquiryDataToRow(data: EnquiryData): (string | undefined)[] {
  const date = data.date || new Date().toLocaleString('en-IN')
  return [data.name, data.email, data.phone, data.studentType, data.interests, data.goal, data.city, data.source, data.message, data.consent, date]
}

/**
 * Check if a phone number already exists in the enquiry file
 */
export function checkDuplicatePhone(phone: string): boolean {
  try {
    ensurePublicDirectory()
    if (!fs.existsSync(ENQUIRIES_FILE)) {
      return false
    }

    const file = fs.readFileSync(ENQUIRIES_FILE)
    const workbook = XLSX.read(file, { type: 'buffer' })
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

    // Skip header row and check phone column (index 2)
    for (let i = 1; i < data.length; i++) {
      if (data[i][2] === phone) {
        return true
      }
    }
    return false
  } catch (error) {
    console.error('Error checking duplicate phone:', error)
    return false
  }
}

/**
 * Add a new enquiry to the Excel file
 */
export function addEnquiry(data: EnquiryData): boolean {
  try {
    ensurePublicDirectory()
    let workbook: XLSX.WorkBook
    let worksheet: XLSX.WorkSheet

    const headers = getEnquiryHeaders()

    if (fs.existsSync(ENQUIRIES_FILE)) {
      // Read existing file
      const file = fs.readFileSync(ENQUIRIES_FILE)
      workbook = XLSX.read(file, { type: 'buffer' })
      worksheet = workbook.Sheets[workbook.SheetNames[0]]
    } else {
      // Create new workbook
      workbook = XLSX.utils.book_new()
      worksheet = XLSX.utils.aoa_to_sheet([headers])
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Enquiries')
    }

    // Convert sheet to array of arrays
    const existingData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

    // Add new row
    const newRow = enquiryDataToRow(data)
    existingData.push(newRow)

    // Update worksheet
    const updatedWorksheet = XLSX.utils.aoa_to_sheet(existingData)
    workbook.Sheets[workbook.SheetNames[0]] = updatedWorksheet

    // Write to file
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    fs.writeFileSync(ENQUIRIES_FILE, Buffer.from(buffer))

    return true
  } catch (error) {
    console.error('Error adding enquiry:', error)
    return false
  }
}
