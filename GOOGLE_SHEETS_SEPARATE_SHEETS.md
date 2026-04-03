# Google Apps Script Deployment Guide - Separate Sheets

## Overview

Your registration and enquiry forms now save to **separate sheets**:
- **Registration Sheet**: "Registered Candidates"
- **Enquiry Sheet**: "Enquiries"

## Step-by-Step Deployment

### 1. Open Google Apps Script

1. Go to your **Google Sheet**
2. Click **Extensions** → **Apps Script**
3. Delete all existing code in the editor
4. Copy the code from below and paste it

### 2. Updated Google Apps Script Code

```javascript
// =======================
// GOOGLE APPS SCRIPT CODE - UPDATED FOR SEPARATE SHEETS
// =======================
// This script routes registrations and enquiries to separate Google Sheets
// Replace YOUR_SHEET_ID below with your actual Google Sheet ID
// Sheet ID: Get it from URL: https://docs.google.com/spreadsheets/d/{ID}/

const SPREADSHEET_ID = '1QH8sRAi3XnvGUgkGHC14rbojkB2R3Y1NnjiCoCJRYuI'; // Replace with your sheet ID
const REGISTRATION_SHEET_NAME = 'Registered Candidates';
const ENQUIRY_SHEET_NAME = 'Enquiries';

function doPost(e) {
  try {
    Logger.log('=== Webhook Triggered ===');
    Logger.log('Timestamp: ' + new Date());
    
    // Parse request
    const contents = e.postData.contents;
    Logger.log('Raw request: ' + contents);
    
    const payload = JSON.parse(contents);
    Logger.log('Parsed payload: ' + JSON.stringify(payload));
    
    // Get spreadsheet
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    Logger.log('Opened spreadsheet: ' + ss.getName());
    
    // Determine which sheet to use based on type
    const dataType = payload.type || 'registration'; // Default to registration if not specified
    let sheet;
    let sheetName;
    
    if (dataType === 'enquiry') {
      sheetName = ENQUIRY_SHEET_NAME;
      sheet = ss.getSheetByName(sheetName);
      
      if (!sheet) {
        Logger.log('Creating new Enquiry sheet: ' + sheetName);
        sheet = ss.insertSheet(sheetName);
      }
      
      handleEnquiry(sheet, payload);
    } else {
      // Default: handle as registration
      sheetName = REGISTRATION_SHEET_NAME;
      sheet = ss.getSheetByName(sheetName);
      
      if (!sheet) {
        Logger.log('Sheet "' + sheetName + '" not found!');
        Logger.log('Available sheets: ' + ss.getSheetNames().join(', '));
        throw new Error('Sheet "' + sheetName + '" does not exist. Available: ' + ss.getSheetNames().join(', '));
      }
      
      handleRegistration(sheet, payload);
    }
    
    Logger.log('✓ Success: Data saved to sheet "' + sheetName + '"');
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data logged to Google Sheets',
        sheet: sheetName,
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('✗ ERROR: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle Registration Data
 * Sheet columns: Timestamp, Name, Mobile, Email, Address, Class, Source, Interest, RegistrationDate
 */
function handleRegistration(sheet, payload) {
  // Add headers if sheet is empty
  if (sheet.getLastRow() === 0) {
    const headers = [
      'Timestamp',
      'Name',
      'Mobile',
      'Email',
      'Address',
      'Class/Bootcamp',
      'Source',
      'Interest',
      'Registration Date'
    ];
    sheet.appendRow(headers);
    Logger.log('Registration sheet headers created');
  }
  
  // Prepare row
  const now = new Date().toISOString();
  const row = [
    now,
    payload.name || '',
    payload.mobile || '',
    payload.email || '',
    payload.address || '',
    payload.class || '',
    payload.source || '',
    payload.interest || '',
    payload.date || ''
  ];
  
  Logger.log('Appending registration row: ' + JSON.stringify(row));
  sheet.appendRow(row);
}

/**
 * Handle Enquiry Data
 * Sheet columns: Timestamp, Name, Mobile, Email, Message, Bootcamp, Source, Enquiry Date
 */
function handleEnquiry(sheet, payload) {
  // Add headers if sheet is empty
  if (sheet.getLastRow() === 0) {
    const headers = [
      'Timestamp',
      'Name',
      'Mobile',
      'Email',
      'Message',
      'Bootcamp/Interest',
      'Source',
      'Enquiry Date'
    ];
    sheet.appendRow(headers);
    Logger.log('Enquiry sheet headers created');
  }
  
  // Prepare row for enquiry
  const now = new Date().toISOString();
  const row = [
    now,
    payload.name || '',
    payload.mobile || '',
    payload.email || '',
    payload.message || payload.address || '', // Use message if available, fallback to address
    payload.bootcamp || payload.class || '',
    payload.source || 'Contact Form',
    payload.date || ''
  ];
  
  Logger.log('Appending enquiry row: ' + JSON.stringify(row));
  sheet.appendRow(row);
}
```

### 3. Replace Your Sheet ID

1. Open your Google Sheet
2. Look at the URL in your browser: `https://docs.google.com/spreadsheets/d/{ID}/edit`
3. Copy the ID part between `/d/` and `/edit`
4. In the Apps Script, replace:
```javascript
const SPREADSHEET_ID = '1QH8sRAi3XnvGUgkGHC14rbojkB2R3Y1NnjiCoCJRYuI'; // Your Sheet ID here
```

### 4. Deploy the Script

1. Click **Deploy** → **New Deployment**
2. Select **Type**: Choose "Web app"
3. **Execute as**: Select your email
4. **Who has access**: Select "Anyone"
5. Click **Deploy**
6. Copy the **Deployment URL** (something like: `https://script.google.com/macros/s/AKfycbz.../exec`)

### 5. Update Your .env.local File

In your Next.js project, update `.env.local`:

```
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Replace `YOUR_DEPLOYMENT_ID` with the ID from the deployment URL.

### 6. Create the Sheets

Your Google Sheet should have these tabs:
- ✅ **Registered Candidates** (for registration form submissions)
- ✅ **Enquiries** (for contact form enquiries)

They will be created automatically if they don't exist!

## How It Works

### Registration Form Data Flow

```
User submits Registration
         ↓
POST /api/register
         ↓
Add type: 'registration'
         ↓
Send to Google Apps Script
         ↓
Script detects type
         ↓
Route to "Registered Candidates" sheet
         ↓
Add headers (first time)
         ↓
Append registration row
```

### Enquiry Form Data Flow

```
User submits Contact Form
         ↓
POST /api/enquiry
         ↓
Add type: 'enquiry'
         ↓
Send to Google Apps Script
         ↓
Script detects type
         ↓
Create/Route to "Enquiries" sheet
         ↓
Add headers (first time)
         ↓
Append enquiry row
```

## Sheet Structures

### Registration Sheet ("Registered Candidates")
```
Columns: Timestamp | Name | Mobile | Email | Address | Class/Bootcamp | Source | Interest | Registration Date
Example: 2024-04-03T10:30:00Z | John Doe | 9876543210 | john@email.com | 123 Street | AI Bootcamp | Friend | Yes | 03-04-2024
```

### Enquiry Sheet ("Enquiries")
```
Columns: Timestamp | Name | Mobile | Email | Message | Bootcamp/Interest | Source | Enquiry Date
Example: 2024-04-03T10:45:00Z | Jane Doe | 9123456789 | jane@email.com | I want to know more about the bootcamp | General Enquiry | Contact Form | 03-04-2024
```

## Next.js Code Changes

### Updated Files:

1. **`lib/googleSheets.ts`** - Added `type` parameter
2. **`app/api/register/route.ts`** - Sends `type: 'registration'`
3. **`app/api/enquiry/route.ts`** - Sends `type: 'enquiry'`

## Testing

### Test Registration:
1. Go to your website
2. Click "Register Now"
3. Fill and submit form
4. Check "Registered Candidates" sheet ✅

### Test Enquiry:
1. Go to contact section
2. Fill and submit enquiry form
3. Check "Enquiries" sheet ✅

## Troubleshooting

### Data not appearing?

1. **Check the Deployment URL:**
   - Verify `.env.local` has correct `GOOGLE_SCRIPT_URL`
   
2. **Check Google Apps Script logs:**
   - In Apps Script editor: Click **Executions** to see logs
   - Look for "Data saved to sheet" message

3. **Verify Sheet Names:**
   - Your Google Sheet must have tabs: "Registered Candidates" and "Enquiries"
   - Or they'll be created automatically on first data submission

4. **Check Permissions:**
   - Share Google Sheet with the email used for Apps Script deployment
   - Deployment should have "Anyone" access

5. **Browser Console:**
   - Open DevTools → Console
   - Look for `✓ Data sent to Google Sheets (registration)` or `✓ Data sent to Google Sheets (enquiry)`

### Still not working?

- Redeploy the Google Apps Script (new version)
- Update `.env.local` with new deployment URL
- Restart your Next.js development server
- Clear browser cache

## Key Benefits

✅ **Separate Data**: Registrations and enquiries are in different sheets
✅ **Automatic Sheet Creation**: "Enquiries" sheet created automatically
✅ **Automatic Headers**: Column headers added automatically on first submission
✅ **Logging**: Full execution logs available in Apps Script editor
✅ **Type Detection**: Script automatically routes based on data type
✅ **Error Handling**: Detailed error messages in logs

## Files Used

- `GOOGLE_APPS_SCRIPT_UPDATED.gs` - New Apps Script code
- `lib/googleSheets.ts` - Updated to send type
- `app/api/register/route.ts` - Sends registration type
- `app/api/enquiry/route.ts` - Sends enquiry type
