# Enquiry Form & Register Now - Complete Guide

## ✅ What's Been Set Up

### 1. Fixed Register Now Button (CTABanner)
The "Register Now" button in the CTA Banner section now properly links to `/register` page.

### 2. Created Enquiry Form System
- **Enquiry Form Component**: `components/forms/EnquiryForm.tsx`
- **Enquiry Page**: `app/enquiry/page.tsx`
- **Enquiry API Route**: `app/api/enquiry/route.ts`
- **"Send Detailed Enquiry" Button**: Added to Contact section

---

## 📋 Step-by-Step Usage

### For Users:

#### **Register Now Button**
1. Click **"Register Now"** button (appears in multiple places)
2. Fill in the registration form with:
   - Full Name
   - Mobile Number (10 digits)
   - Email Address
   - Address (optional)
   - Class (10th or 12th)
   - How did you hear about us
   - Interest in courses
3. Submit form
4. Data automatically saved to:
   - Local Excel file
   - Google Sheet (Registered Candidates)
5. Redirected to Success page with congratulations message

#### **Send Enquiry Button**
1. Click **"Send Detailed Enquiry"** button (in Contact section)
2. Fill in the enquiry form with:
   - Full Name
   - Mobile Number
   - Email Address
   - Select Enquiry Type (AI Udaan, Other Programs, etc.)
   - Your detailed message/question
3. Submit form
4. Data saved to Google Sheets
5. Receive confirmation message

---

## 🔧 Technical Architecture

### Register Now Flow:
```
User fills form → /api/register → Google Sheets + Excel → /success?name=...
```

### Enquiry Flow:
```
User fills form → /api/enquiry → Google Sheets → Confirmation
```

---

## 📂 File Structure

```
app/
├── api/
│   ├── register/route.ts       ✅ Registration API
│   ├── enquiry/route.ts        ✅ Enquiry API
│   ├── auth/
│   ├── contact/
│   ├── courses/
│   └── ...
├── enquiry/
│   └── page.tsx                ✅ Enquiry form page
├── (main)/
│   └── register/
│       └── page.tsx            ✅ Registration form page
└── ...

components/
├── forms/
│   ├── RegistrationForm.tsx    ✅ Registration form
│   └── EnquiryForm.tsx         ✅ Enquiry form
├── landing/
│   ├── contact.tsx             ✅ Updated with Enquiry button
│   └── bootcamp-hero.tsx       ✅ Register Now button
├── ui/
│   └── CTABanner.tsx           ✅ Fixed Register Now button
└── ...
```

---

## 🔑 Key Features

### 1. Register Now:
- ✅ Collects full registration details
- ✅ Validates email & mobile number
- ✅ Saves to Google Sheets (Registered Candidates)
- ✅ Saves to Excel file locally
- ✅ Shows personalized success page with name & schedule
- ✅ Redirects to "/success" page

### 2. Enquiry:
- ✅ Simpler form for general questions
- ✅ Allows custom messages
- ✅ Validates required fields
- ✅ Saves enquiry details to Google Sheets
- ✅ Shows confirmation message
- ✅ Page: `/enquiry`

### 3. Google Sheets Integration:
- ✅ Both forms data saved to same Google Sheet
- ✅ Register Now → Full details
- ✅ Enquiry → Marked as "Enquiry Form" in source column

---

## 🚀 How to Test

### Test Register Now:
1. Go to `http://localhost:3000`
2. Click any "Register Now" button
3. Fill form with:
   - Name: Test User
   - Mobile: 9876543210
   - Email: test@example.com
   - Address: Test Address
   - Class: 10
   - Source: Website
   - Interest: AI
4. Click "Register Now"
5. Check:
   - ✅ Success page appears with your name
   - ✅ Data in Google Sheet
   - ✅ Toast notification shows

### Test Enquiry:
1. Go to `http://localhost:3000`
2. Scroll to "Get in Touch" section
3. Click "Send Detailed Enquiry" button
4. Fill form:
   - Name: Inquiry User
   - Mobile: 9876543211
   - Email: enquiry@example.com
   - Enquiry Type: AI Udaan Bootcamp
   - Message: I have some questions about the bootcamp
5. Click "Send Enquiry"
6. Check:
   - ✅ Confirmation message appears
   - ✅ Data in Google Sheet (source = "Enquiry Form")

---

## 🔗 Button Locations

### Register Now Buttons:
1. **Bootcamp Hero Section** - Top of page ✅ FIXED
2. **CTA Banner** - Middle of page ✅ FIXED
3. **Success Page** - Shows congratulations ✅

### Enquiry Button:
1. **Contact Section** - "Send Detailed Enquiry" button ✅

---

## 📊 Data Flow

### What Gets Saved:

#### Registration:
- Name ✅
- Mobile ✅
- Email ✅
- Address ✅
- Class ✅
- Source (How heard) ✅
- Interest ✅
- Date/Time ✅

#### Enquiry:
- Name ✅
- Mobile ✅
- Email ✅
- Enquiry Type ✅
- Message (in Interest column) ✅
- Source: "Enquiry Form" ✅
- Date/Time ✅

Both stored in your **Google Sheet: Registered Candidates**

---

## ⚙️ Configuration

### Environment Variables (.env.local)
```
GOOGLE_SCRIPT_URL=your-google-apps-script-url
```

### Register Now Links:
- Form Page: `/register`
- Success Page: `/success?name=...&email=...&mobile=...`

### Enquiry Links:
- Form Page: `/enquiry`
- API: `/api/enquiry`

---

## 📞 Support

### If Register Now not working:
1. Check if page loads at `/register` ✅
2. Check console for errors
3. Verify Google Apps Script URL in `.env.local`
4. Test with dummy data

### If Enquiry not working:
1. Check if page loads at `/enquiry` ✅
2. Verify `/api/enquiry` route exists ✅
3. Check browser console for errors
4. Verify Google Sheets permissions

---

## 🎯 Next Steps (Optional)

If you want to enhance further:
1. Add email notifications when enquiry received
2. Auto-reply email to enquirer
3. Admin dashboard to view enquiries
4. Separate enquiry sheet in Google Sheets
5. WhatsApp integration for enquiries
6. SMS notifications

---

## ✨ Summary

**What's Working:**
- ✅ Register Now (fixed) - Full registration with Google Sheets sync
- ✅ Enquiry Form (new) - Simplified enquiry collection
- ✅ Both forms validate data properly
- ✅ Success pages show personalized messages
- ✅ All data synced to Google Sheets
- ✅ Buttons linked correctly throughout site

**Start Using:**
1. Test Register Now at `http://localhost:3000/register`
2. Test Enquiry at `http://localhost:3000/enquiry`
3. Try buttons on homepage
4. Check Google Sheet for data
