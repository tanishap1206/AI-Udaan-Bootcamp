# Quick Reference - Code to Add for Separate Sheets

## What Changed

✅ **Google Apps Script**: Now routes to separate sheets  
✅ **Next.js**: Sends `type` parameter with each submission  
✅ **Sheets**: Automatically creates "Enquiries" sheet for enquiry data

---

## 1️⃣ Google Apps Script - Copy This Code

**File**: Google Apps Script Editor (in your Google Sheet)

**Replace all code with:**

```javascript
// =======================
// GOOGLE APPS SCRIPT CODE - UPDATED FOR SEPARATE SHEETS
// =======================

const SPREADSHEET_ID = '1QH8sRAi3XnvGUgkGHC14rbojkB2R3Y1NnjiCoCJRYuI'; // CHANGE THIS!
const REGISTRATION_SHEET_NAME = 'Registered Candidates';
const ENQUIRY_SHEET_NAME = 'Enquiries';

function doPost(e) {
  try {
    Logger.log('=== Webhook Triggered ===');
    Logger.log('Timestamp: ' + new Date());
    
    const contents = e.postData.contents;
    Logger.log('Raw request: ' + contents);
    
    const payload = JSON.parse(contents);
    Logger.log('Parsed payload: ' + JSON.stringify(payload));
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    Logger.log('Opened spreadsheet: ' + ss.getName());
    
    const dataType = payload.type || 'registration';
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
      sheetName = REGISTRATION_SHEET_NAME;
      sheet = ss.getSheetByName(sheetName);
      
      if (!sheet) {
        Logger.log('Sheet "' + sheetName + '" not found!');
        Logger.log('Available sheets: ' + ss.getSheetNames().join(', '));
        throw new Error('Sheet "' + sheetName + '" does not exist');
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
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleRegistration(sheet, payload) {
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

function handleEnquiry(sheet, payload) {
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
  
  const now = new Date().toISOString();
  const row = [
    now,
    payload.name || '',
    payload.mobile || '',
    payload.email || '',
    payload.message || payload.address || '',
    payload.bootcamp || payload.class || '',
    payload.source || 'Contact Form',
    payload.date || ''
  ];
  
  Logger.log('Appending enquiry row: ' + JSON.stringify(row));
  sheet.appendRow(row);
}
```

**⚠️ IMPORTANT**: Change `SPREADSHEET_ID` to your Google Sheet ID!

---

## 2️⃣ Deploy the Script

1. Click **Deploy** → **New Deployment**
2. **Type**: Select "Web app"
3. **Execute as**: Your email
4. **Who has access**: "Anyone"
5. Click **Deploy**
6. Copy the deployment URL: `https://script.google.com/macros/s/ABC123/exec`

---

## 3️⃣ Update .env.local

```
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

---

## 4️⃣ Check Your Next.js Code

These files have been **automatically updated** in your project:

### `lib/googleSheets.ts` - Updated entry
```typescript
export interface RegistrationPayload {
  // ... existing fields ...
  type?: 'registration' | 'enquiry' // ← NEW
}

export async function sendToGoogleSheets(data: RegistrationPayload) {
  // ... sends type parameter to Google Apps Script ...
}
```

### `app/api/register/route.ts` - Updated
```typescript
const registrationData = {
  // ... existing fields ...
  type: 'registration' as const, // ← ADDED
}
```

### `app/api/enquiry/route.ts` - Updated
```typescript
const googleSheetResult = await sendToGoogleSheets({
  // ... data fields ...
  type: 'enquiry' as const, // ← ADDED
})
```

---

## ✅ Testing

### Test Registration
```
1. Fill registration form
2. Submit
3. Check "Registered Candidates" sheet
4. Should have new row with: Name, Mobile, Email, Address, Class, Source, Interest
```

### Test Enquiry
```
1. Fill contact form (in contact section)
2. Submit
3. Check "Enquiries" sheet
4. Should have new row with: Name, Mobile, Email, Message, Bootcamp/Interest
```

---

## 📊 Google Sheet Structure

Your Google Sheet should now have **2 tabs**:

### Tab 1: "Registered Candidates"
| Timestamp | Name | Mobile | Email | Address | Class/Bootcamp | Source | Interest | Registration Date |
|-----------|------|--------|-------|---------|-----------------|--------|----------|-------------------|
| 2024-04-03T10:00:00Z | John Doe | 9876543210 | john@email.com | 123 St | AI Bootcamp | Friend | Yes | 03-04-2024 |

### Tab 2: "Enquiries"
| Timestamp | Name | Mobile | Email | Message | Bootcamp/Interest | Source | Enquiry Date |
|-----------|------|--------|-------|---------|-------------------|--------|--------------|
| 2024-04-03T10:30:00Z | Jane Doe | 9123456789 | jane@email.com | When does the bootcamp start? | General Enquiry | Contact Form | 03-04-2024 |

---

## 🔍 Troubleshooting

**Data not appearing?**

1. Check browser console for: `✓ Data sent to Google Sheets (registration)` or `✓ Data sent to Google Sheets (enquiry)`
2. In Google Apps Script editor, click **Executions** to see logs
3. Verify `.env.local` has correct `GOOGLE_SCRIPT_URL`
4. Restart your Next.js dev server

**Sheet not created?**

The "Enquiries" sheet is created automatically when the first enquiry is submitted.

---

## 📝 Summary

| Action | Location | What to Do |
|--------|----------|-----------|
| Copy Google Apps Script | Google Sheet | Replace all code with script above |
| Deploy | Google Apps Script | Click Deploy → New Deployment |
| Update URL | `.env.local` | Add deployment URL as `GOOGLE_SCRIPT_URL` |
| Test | Your website | Submit registration & enquiry forms |
| Verify | Google Sheet | Check both tabs have data |

**Next.js files are already updated!** ✅
