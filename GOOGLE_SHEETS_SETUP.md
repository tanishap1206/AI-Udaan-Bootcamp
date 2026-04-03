# Google Sheets Integration Setup

## Overview
The registration form now integrates with Google Sheets. When users register, their data is logged to a Google Sheet automatically.

## Setup Instructions

### Step 1: Create a Google Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Create a new project
3. Delete the default `myFunction()` code
4. Copy and paste the following code:

```javascript
// Get the spreadsheet and sheet
const SPREADSHEET_ID = '1QH8sRAi3XnvGUgkGHC14rbojkB2R3Y1NnjiCoCJRYuI';
const SHEET_NAME = 'Sheet1'; // Change this if your sheet has a different name

function doPost(e) {
  try {
    // Parse the JSON data from the request
    const data = JSON.parse(e.postData.contents);
    
    // Get the spreadsheet and sheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Check if headers exist, if not add them
    const lastRow = sheet.getLastRow();
    if (lastRow === 0) {
      const headers = ['Name', 'Mobile', 'Email', 'Address', 'Class', 'Source', 'Interest', 'Date'];
      sheet.appendRow(headers);
    }
    
    // Append the registration data
    const newRow = [
      data.name,
      data.mobile,
      data.email,
      data.address,
      data.class,
      data.source,
      data.interest,
      data.date
    ];
    
    sheet.appendRow(newRow);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Data logged to Google Sheets' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error: ' + error);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 2: Update the Spreadsheet ID

Replace `'1QH8sRAi3XnvGUgkGHC14rbojkB2R3Y1NnjiCoCJRYuI'` with your actual Google Sheets ID in the script.

You can find the ID in the URL: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`

### Step 3: Deploy as Web App

1. Click **Deploy** button (top right)
2. Click **New deployment**
3. Select deployment type: **Web app**
4. Configure:
   - Execute as: Your Google Account
   - Who has access: **Anyone**
5. Click **Deploy**
6. Copy the deployment URL (it will look like: `https://script.google.com/macros/d/{deploymentId}/useless`)

### Step 4: Configure the Application

1. Open the `.env.local` file in your project (create it if it doesn't exist)
2. Add the deployment URL:
```
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/d/{YOUR_DEPLOYMENT_ID}/useless
```

3. Replace `{YOUR_DEPLOYMENT_ID}` with the actual ID from your deployment URL

### Step 5: Test It

1. Run your application: `npm run dev`
2. Fill out and submit the registration form
3. Check your Google Sheet - the data should appear as a new row

## Troubleshooting

- **Data not appearing in Google Sheets?**
  - Verify the Google Apps Script deployment URL is correct in `.env.local`
  - Check the browser console for any errors
  - Check Google Apps Script execution logs in the Apps Script editor

- **Script shows errors?**
  - Go back to the Apps Script editor
  - Click **Executions** tab to see detailed error logs
  - Verify the SPREADSHEET_ID is correct

## Security Notes

- The Google Apps Script URL is accessible on the client-side (public)
- Consider using a backend proxy for production environments
- The "no-cors" mode limits what the client can see, but the Apps Script validates all input
