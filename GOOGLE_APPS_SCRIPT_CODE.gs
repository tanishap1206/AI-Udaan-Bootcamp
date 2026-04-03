// =======================
// GOOGLE APPS SCRIPT CODE
// =======================
// Replace YOUR_SHEET_ID and YOUR_SHEET_NAME below
// Sheet ID: Get it from URL: https://docs.google.com/spreadsheets/d/{ID}/
// Sheet Name: The tab name at the bottom (default is "Sheet1")

const SPREADSHEET_ID = '1QH8sRAi3XnvGUgkGHC14rbojkB2R3Y1NnjiCoCJRYuI';
const SHEET_NAME = 'Registered Candidates'; // ✓ This is the correct sheet name

function doPost(e) {
  try {
    Logger.log('=== Webhook Triggered ===');
    Logger.log('Timestamp: ' + new Date());
    
    // Parse request
    const contents = e.postData.contents;
    Logger.log('Raw request: ' + contents);
    
    const payload = JSON.parse(contents);
    Logger.log('Parsed payload: ' + JSON.stringify(payload));
    
    // Get spreadsheet and sheet
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    Logger.log('Opened spreadsheet: ' + ss.getName());
    
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      Logger.log('Sheet "' + SHEET_NAME + '" not found!');
      Logger.log('Available sheets: ' + ss.getSheetNames().join(', '));
      throw new Error('Sheet "' + SHEET_NAME + '" does not exist. Available: ' + ss.getSheetNames().join(', '));
    }
    
    // Add headers if empty
    if (sheet.getLastRow() === 0) {
      const headers = ['Timestamp', 'Name', 'Mobile', 'Email', 'Address', 'Class', 'Source', 'Interest', 'RegistrationDate'];
      sheet.appendRow(headers);
      Logger.log('Headers created');
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
    
    Logger.log('Appending row: ' + JSON.stringify(row));
    sheet.appendRow(row);
    
    Logger.log('✓ Success: Row appended at ' + now);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data logged to Google Sheets',
        timestamp: now
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

