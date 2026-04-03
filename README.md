# AI Udaan Bootcamp - LMS Platform

A modern, full-stack Learning Management System (LMS) for AI bootcamp registration and student management. Built with **Next.js**, **Tailwind CSS**, and **Google Sheets integration**.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Configuration](#setup--configuration)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- Google Account (for Sheets integration)

### Local Development

```bash
# Clone and install
git clone https://github.com/tanishap1206/AI-Udaan-Bootcamp.git
cd ai-learn-ng-lms
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

---

## ✨ Features

### Core Features
- ✅ **Student Registration** - Full form with validation
- ✅ **Contact Enquiries** - Inline contact form in contact section
- ✅ **Google Sheets Integration** - Auto-sync to separate sheets
- ✅ **Email Validation** - Real-time email format validation
- ✅ **Mobile Validation** - 10-digit phone number validation
- ✅ **Success Page** - Personalized registration confirmation
- ✅ **Toast Notifications** - Real-time user feedback
- ✅ **Responsive Design** - Mobile-friendly UI
- ✅ **Glassmorphism Design** - Modern gradient-based styling

### Data Management
- 📊 **Registration Sheet** - All registrations in Google Sheets
- 📋 **Enquiry Sheet** - All enquiries in separate sheet
- 📁 **Local Excel Backup** - Optional local file storage
- 🔐 **JWT Authentication** - Secure API endpoints

### UI/UX Components
- 🎨 **Landing Sections** - Hero, about, features, pricing, etc.
- 🧭 **Navigation** - Top header, navbar, footer
- 🔤 **Text Optimization** - Properly sized headings and body text
- 🗺️ **Google Maps Embed** - Location display in about section
- 💬 **WhatsApp Button** - Direct messaging integration

---

## 🛠 Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | Next.js 16.2.1, React, TypeScript, Tailwind CSS |
| **Build Tool** | Turbopack (Next.js built-in) |
| **Animations** | Framer Motion |
| **Database** | Prisma ORM, SQLite (local) |
| **External Services** | Google Sheets API, Google Apps Script |
| **Authentication** | JWT (jsonwebtoken, bcrypt) |
| **HTTP Client** | Axios |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
ai-learn-ng-lms/
├── docs/                          # Documentation
│   ├── DEPLOYMENT.md             # Vercel deployment guide
│   └── GOOGLE_SHEETS.md          # Google Sheets setup
│
├── app/                          # Next.js app directory
│   ├── (auth)/                   # Auth routes group
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (main)/                   # Main routes group
│   │   ├── courses/
│   │   ├── dashboard/
│   │   ├── register/
│   │   ├── contact/
│   │   ├── success/              # Registration success page
│   │   ├── privacy-policy/
│   │
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── me/
│   │   ├── register/             # Registration endpoint
│   │   ├── enquiry/              # Contact enquiry endpoint
│   │   ├── courses/
│   │   └── contact/
│   │
│   ├── about/
│   ├── layout.tsx
│   ├── page.tsx                  # Homepage
│   └── globals.css
│
├── components/
│   ├── landing/                  # Landing page sections
│   │   ├── bootcamp-hero.tsx
│   │   ├── about-organizer.tsx
│   │   ├── contact.tsx           # Contact form (main)
│   │   ├── program-structure.tsx
│   │   ├── why-bootcamp.tsx
│   │   ├── what-you-build.tsx
│   │   └── ... (other sections)
│   │
│   ├── forms/
│   │   └── RegistrationForm.tsx
│   │
│   ├── shared/                   # Reusable components
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── glass-card.tsx
│   │   └── course-card.tsx
│   │
│   ├── providers/                # Context providers
│   │   ├── ToastProvider.tsx
│   │   └── ToastContext.tsx
│   │
│   └── ui/                       # UI components
│       ├── button.tsx
│       ├── input.tsx
│       ├── card.tsx
│       ├── navbar.tsx
│       ├── Modal.tsx
│       ├── CTABanner.tsx
│       └── WhatsAppButton.tsx
│
├── lib/
│   ├── googleSheets.ts           # Google Sheets API helper
│   ├── db.ts                     # Database connection
│   ├── excel.ts                  # Excel file handling
│   ├── utils.ts                  # Utility functions
│   ├── animationVariants.ts      # Framer Motion variants
│   └── auth/
│       └── jwt.ts                # JWT utilities
│
├── hooks/
│   ├── useToast.ts              # Toast notifications
│   ├── useAuth.ts               # Authentication hook
│   └── index.ts
│
├── types/
│   └── index.ts                 # TypeScript types
│
├── public/
│   └── images/
│
├── prisma/
│   └── schema.prisma            # Database schema
│
├── .env.local                   # Environment variables (not in git)
├── .env.example                 # Example env file
├── vercel.json                  # Vercel configuration
├── tsconfig.json                # TypeScript config
├── tailwind.config.ts           # Tailwind CSS config
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ Setup & Configuration

### 1. Environment Variables

Create `.env.local` in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# JWT Secret (change in production!)
JWT_SECRET="your-super-secret-key-change-in-production-12345"

# Google Apps Script URL (for Sheets integration)
GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
```

### 2. Google Sheets Integration

#### Setup Steps:
1. Create a Google Sheet with two tabs:
   - **Registered Candidates** (for registrations)
   - **Enquiries** (for contact form submissions)

2. Create a Google Apps Script to handle the webhook:
   - Go to `Extensions` → `Apps Script` in your Google Sheet
   - Copy code from provided Google Apps Script
   - Update the `SPREADSHEET_ID` with your Sheet ID
   - Deploy as Web App → Deploy

3. Add the deployment URL to `.env.local`:
```env
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec
```

#### Sheet Columns:

**Registered Candidates Sheet:**
```
Timestamp | Name | Mobile | Email | Address | Class/Bootcamp | Source | Interest | Date
```

**Enquiries Sheet:**
```
Timestamp | Name | Mobile | Email | Message | Bootcamp/Interest | Source | Date
```

---

## 📡 API Documentation

### Registration Endpoint
**POST** `/api/register`

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "9876543210",
  "address": "123 Street, City",
  "class": "AI Bootcamp",
  "source": "Friend",
  "interest": "Yes"
}
```

### Enquiry Endpoint
**POST** `/api/enquiry`

Request body:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "mobile": "9123456789",
  "message": "When does the bootcamp start?",
  "bootcamp": "General Enquiry"
}
```

---

## 🚀 Deployment to Vercel

### Quick Deploy
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `GOOGLE_SCRIPT_URL`: Your Google Apps Script URL
   - `JWT_SECRET`: Your secret key
5. Deploy!

### See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed steps

---

## 🔧 Building & Running

```bash
# Development
npm run dev                    # Run with hot reload

# Production Build
npm run build                  # Build optimized version
npm run start                  # Start production server

# Linting
npm run lint                   # Check code style
```

---

## 🎨 Design System

### Colors
- **Primary**: Cyan (#06B6D4)
- **Secondary**: Purple (#A855F7)
- **Accent**: Pink (#EC4899)
- **Background**: Dark with glassmorphism

### Typography
- **Headings**: Bold, large sizes
- **Body**: Clear, readable
- **Gradient Text**: Cyan → Purple

---

## 🐛 Troubleshooting

### Build Issues
**Prisma Client Error:** Run `npx prisma generate`

**TypeScript Errors:** Check path aliases in `tsconfig.json`

### Form Submission Issues
1. Verify API routes exist
2. Check Google Apps Script URL in `.env.local`
3. Ensure Google Sheet has correct tab names

### Deployment Issues
- Clear Vercel build cache if needed
- Check environment variables are set
- Run `npm run build` locally first to verify

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Prisma ORM](https://www.prisma.io)
- [Google Sheets API](https://developers.google.com/sheets)

---

**Version:** 1.0.0  
**Status:** ✅ Production Ready on Vercel
