# Contact Form Implementation Guide

## Changes Made

### 1. ✅ Removed "Send Detailed Enquiry" Button
- **File**: `components/landing/contact.tsx`
- **Removed**: Link to `/enquiry` page and "Send Detailed Enquiry" button
- **Result**: Cleaner UI with single contact section

### 2. ✅ Deleted Enquiry Page
- **File**: `app/enquiry/page.tsx` 
- **Action**: Entire directory removed
- **Result**: No separate enquiry page needed

### 3. ✅ Deleted Enquiry Form Component
- **File**: `components/forms/EnquiryForm.tsx`
- **Action**: File deleted
- **Result**: Single form component in contact section

### 4. ✅ Updated Contact Form with Registration Logic
- **File**: `components/landing/contact.tsx`
- **Changes**:
  - Added form state management (useState)
  - Added validation for name, email, mobile, message
  - Added handleSubmit function that:
    - Validates all fields
    - Makes POST request to `/api/enquiry`
    - Shows toast notification on success/error
    - Clears form on successful submission
  - Integrated with toast notifications
  - Loading state for submit button

### 5. ✅ Updated API Enquiry Route
- **File**: `app/api/enquiry/route.ts`
- **Changes**:
  - Accepts: `name`, `email`, `mobile`, `message`, `bootcamp`
  - Validates email format and 10-digit mobile
  - Sends data to Google Sheets (same as registration)
  - Returns success response with submitted data

## Form Fields

The contact form now collects:
- **Name**: Full name (required)
- **Email**: Valid email address (required)
- **Mobile**: 10-digit phone number (required)
- **Message**: User's enquiry message (required)

## Data Flow

```
Contact Form Input
    ↓
Client-side Validation
    ↓
POST to /api/enquiry
    ↓
Server Validation
    ↓
Send to Google Sheets
    ↓
Return Success Response
    ↓
Show Toast & Clear Form
```

## Google Sheets Integration

Enquiries are saved to the same Google Sheet as registrations:
- **Sheet Name**: "Registered Candidates"
- **Data Stored**:
  - Name
  - Email
  - Mobile
  - Address (message excerpt)
  - Class (bootcamp type or "General Enquiry")
  - Source (marked as "Contact Form")
  - Interest (marked as "Enquiry")
  - Date & Time

## How It Works

### Contact Form Component (`contact.tsx`)

```typescript
// Form state
const [formData, setFormData] = useState({
  name: '',
  email: '',
  mobile: '',
  message: '',
})

// Validation
const validateForm = () => {
  // Checks: name required, valid email, 10-digit mobile, message required
}

// Submit handler
const handleSubmit = async (e) => {
  // Validates form
  // Calls POST /api/enquiry
  // Shows success/error toast
  // Clears form on success
}
```

### API Route (`/api/enquiry/route.ts`)

```typescript
// Validates incoming data
// Checks: all fields present, valid email format, 10-digit mobile
// Sends to Google Sheets via sendToGoogleSheets()
// Returns success response
```

## Benefits of This Approach

✅ **Simplified UX**: No separate page, just one contact form
✅ **Consistent Data**: Both registrations and enquiries in same sheet
✅ **Same Logic**: Uses proven registration validation & Google Sheets pattern
✅ **Better UX**: Inline form with instant feedback (toast notifications)
✅ **Easier Maintenance**: Less code, fewer components to maintain

## Testing the Form

1. Go to the contact section on homepage
2. Fill in all fields: Name, Email (valid format), Mobile (10 digits), Message
3. Click "Send Message"
4. See loading state on button
5. Success toast appears: "Enquiry sent successfully! ✅"
6. Form clears automatically
7. Check Google Sheet "Registered Candidates" for new entry

## Troubleshooting

### Form not submitting?
- Check browser console for errors
- Verify `/api/enquiry` route is accessible
- Check `.env.local` has `GOOGLE_SCRIPT_URL` set

### Data not in Google Sheets?
- Verify Google Apps Script URL is correct
- Check Google Sheet has "Registered Candidates" sheet name
- Look at browser console for "Data sent to Google Sheets" log message

### Validation errors?
- Email must be valid format (name@domain.com)
- Mobile must be exactly 10 digits
- All fields must be filled

## Files Modified

- ✅ `components/landing/contact.tsx` - Made form functional
- ✅ `app/api/enquiry/route.ts` - Updated for simple fields + Google Sheets

## Files Deleted

- ✅ `app/enquiry/page.tsx` - Removed entire enquiry page
- ✅ `components/forms/EnquiryForm.tsx` - Removed enquiry form component

## Environment Variables Required

In `.env.local`:
```
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/dev
```

The contact form will now work exactly like the registration form! 🎉
