export interface RegistrationPayload {
  name: string
  mobile: string
  email: string
  address: string
  class: string
  aiDomain?: string
  source: string
  interest: string
  date: string
  type?: 'registration' | 'enquiry' // Optional: defaults to 'registration'
}

/**
 * Send data to Google Sheets (registrations or enquiries)
 * Requires a Google Apps Script deployed as Web App with separate sheet handling
 * Set your Google Apps Script URL in .env.local as GOOGLE_SCRIPT_URL
 * 
 * Data will be routed to:
 * - 'Registered Candidates' sheet if type='registration' or not specified
 * - 'Enquiries' sheet if type='enquiry'
 */
export async function sendToGoogleSheets(data: RegistrationPayload): Promise<boolean> {
  try {
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL
    
    if (!googleScriptUrl) {
      console.warn('Google Apps Script URL not configured. Skipping Google Sheets sync.')
      return true // Don't fail the request, just log a warning
    }

    const dataType = data.type || 'registration' // Default to registration

    await fetch(googleScriptUrl, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script requires no-cors
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: dataType,
        name: data.name,
        mobile: data.mobile,
        email: data.email,
        address: data.address,
        class: data.class,
        aiDomain: data.aiDomain || '',
        source: data.source,
        interest: data.interest,
        date: data.date,
        message: data.address, // For enquiries, address contains the message
        bootcamp: data.class, // For enquiries, class contains bootcamp
      }),
    })

    // no-cors mode doesn't give us response details, so we assume success
    console.log(`✓ Data sent to Google Sheets (${dataType})`)
    return true
  } catch (error) {
    console.error('Error sending to Google Sheets:', error)
    // Don't throw error - request should complete even if Google Sheets fails
    return true
  }
}
