// GOOGLE APPS SCRIPT - COPY THIS EXACTLY
// Sheet ID: 1QH8sRAi3XnvGUgkGHC14rbojkB2R3Y1NnjiCoCJRYuI

const SPREADSHEET_ID = '1QH8sRAi3XnvGUgkGHC14rbojkB2R3Y1NnjiCoCJRYuI';
const REGISTRATION_SHEET = 'Registered Candidates';
const ENQUIRY_SHEET = 'Enquiries';

function doPost(e) {
  try {
    // Parse incoming data
    const payload = JSON.parse(e.postData.contents);
    const dataType = payload.type || 'registration';
    
    // Open spreadsheet
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Get or create sheet
    let sheet = ss.getSheetByName(dataType === 'enquiry' ? ENQUIRY_SHEET : REGISTRATION_SHEET);
    
    if (!sheet) {
      const sheetName = dataType === 'enquiry' ? ENQUIRY_SHEET : REGISTRATION_SHEET;
      sheet = ss.insertSheet(sheetName);
    }
    
    // Add headers if needed
    if (sheet.getLastRow() === 0) {
      if (dataType === 'enquiry') {
        sheet.appendRow(['Timestamp', 'Name', 'Mobile', 'Email', 'Message', 'Bootcamp', 'Source', 'Date']);
      } else {
        sheet.appendRow(['Timestamp', 'Name', 'Mobile', 'Email', 'Address', 'Class', 'Source', 'Interest', 'Date']);
      }
    }
    
    // Add data
    if (dataType === 'enquiry') {
      sheet.appendRow([
        new Date().toISOString(),
        payload.name || '',
        payload.mobile || '',
        payload.email || '',
        payload.message || payload.address || '',
        payload.bootcamp || payload.class || '',
        payload.source || 'Contact Form',
        payload.date || ''
      ]);
    } else {
      sheet.appendRow([
        new Date().toISOString(),
        payload.name || '',
        payload.mobile || '',
        payload.email || '',
        payload.address || '',
        payload.class || '',
        payload.source || '',
        payload.interest || '',
        payload.date || ''
      ]);
    }
    
    return ContentService.createTextOutput(JSON.stringify({success: true, message: 'Data saved'})).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}
