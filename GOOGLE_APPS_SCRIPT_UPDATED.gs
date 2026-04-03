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
