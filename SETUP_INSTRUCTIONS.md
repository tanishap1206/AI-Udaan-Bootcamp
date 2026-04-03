# 🚀 AI Learn NG LMS - Complete Setup Instructions

This guide will walk you through setting up the AI Learn NG LMS from scratch.

## ✅ Pre-requisites

Before you begin, make sure you have installed:
- **Node.js** v18.0 or higher ([Download](https://nodejs.org/))
- **npm** v9.0+ (comes with Node.js) or **yarn**
- **Git** (optional, for version control)

Check your versions:
```bash
node --version
npm --version
```

## 📋 Step-by-Step Setup

### 1. Navigate to Project Directory
```bash
cd ai-learn-ng-lms-full-structure
```

### 2. Install Dependencies
Install all required npm packages:
```bash
npm install
```

**Alternative with yarn:**
```bash
yarn install
```

This will install all packages listed in `package.json`, including:
- Next.js 14
- React 18
- Tailwind CSS
- Prisma
- Framer Motion
- Authentication libraries (bcrypt, jsonwebtoken)

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:
```bash
# On Windows (PowerShell)
New-Item .env.local

# On Windows (Command Prompt)
type nul > .env.local

# On macOS/Linux
touch .env.local
```

Add the following content to `.env.local`:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-key-change-in-production-12345"
```

**Important**: For production, replace `JWT_SECRET` with a strong random string.

### 4. Initialize the Database

Run Prisma commands to set up SQLite database:
```bash
# Generate Prisma client
npm run prisma:generate

# Create database and apply migrations
npm run prisma:migrate
```

This will:
- Create `prisma/dev.db` SQLite database
- Apply all database migrations
- Set up User, Course, Enrollment, and Progress tables

### 5. Start Development Server

```bash
npm run dev
```

You should see:
```
> ai-learn-ng-lms@1.0.0 dev
> next dev

> ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

Open your browser and navigate to: **http://localhost:3000**

## 🧪 Testing the Application

### 1. Landing Page (http://localhost:3000)
- View hero section with CTA buttons
- Browse featured courses
- Check features section
- View testimonials
- See call-to-action section

### 2. Sign Up (http://localhost:3000/sign-up)
- Create a new account with:
  - Full Name: "John Doe"
  - Email: "john@example.com"
  - Password: "password123"
- Verify validation (try empty fields, mismatched passwords)

### 3. Sign In (http://localhost:3000/sign-in)
- Sign in with your created account
- Test invalid credentials
- Verify error messages

### 4. Dashboard (http://localhost:3000/dashboard)
- View overview statistics
- Browse recent courses
- Check progress tracking
- View achievements
- Access sidebar navigation

### 5. Courses Page (http://localhost:3000/courses)
- View all available courses
- Test search functionality
- Filter by category
- Filter by level
- View course details

### 6. Contact Page (http://localhost:3000/contact)
- Fill out contact form
- Test form validation
- Submit message (will show success message)

### 7. Privacy Policy (http://localhost:3000/privacy-policy)
- Read privacy policy
- Links to other pages

## 🛠️ Useful Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Open Prisma Studio (database GUI)
npm run prisma:studio

# Lint code
npm run lint
```

## 📁 Important Files

- **`app/layout.tsx`** - Root layout with Navbar
- **`app/page.tsx`** - Landing page
- **`app/(auth)/sign-in/page.tsx`** - Sign-in page
- **`app/(auth)/sign-up/page.tsx`** - Sign-up page
- **`app/(main)/dashboard/page.tsx`** - Dashboard page
- **`app/(main)/courses/page.tsx`** - Courses page
- **`tailwind.config.ts`** - Tailwind styling config
- **`prisma/schema.prisma`** - Database schema
- **`.env.local`** - Environment variables

## 🔧 Customization

### Change App Title and Description
Edit `app/layout.tsx`:
```tsx
export const metadata: Metadata = {
  title: 'Your Custom Title',
  description: 'Your custom description',
}
```

### Change Primary Colors
Edit `tailwind.config.ts` to modify color palette:
```ts
primary: {
  500: '#0ea5e9', // Change this color
  // ... other colors
}
```

### Add New Routes
1. Create folder in `app/` directory
2. Add `page.tsx` file
3. Export default component

Example:
```
app/new-page/page.tsx
```

### Add New API Endpoints
Create files in `app/api/`:
```
app/api/new-endpoint/route.ts
```

## ⚠️ Troubleshooting

### Issue: Port 3000 already in use
```bash
# Use different port
PORT=3001 npm run dev
```

### Issue: Database errors
```bash
# Reset database
rm prisma/dev.db
npm run prisma:migrate
```

### Issue: Dependencies not installing
```bash
# Clear npm cache
npm cache clean --force
npm install
```

### Issue: Build errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Issue: Module not found errors
```bash
# Reinstall all dependencies
rm -rf node_modules
npm install
```

## 🚀 Deploying to Production

### Option 1: Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [Vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Set environment variables
6. Click "Deploy"

### Option 2: Deploy to Netlify

1. Push your code to GitHub
2. Visit [Netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Set build command: `npm run build`
6. Set publish directory: `.next`
7. Set environment variables
8. Deploy

### Option 3: Deploy to Custom Server

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

Set environment variables on your server before starting.

## 📊 Database Management

### View Database with Prisma Studio
```bash
npm run prisma:studio
```

This opens a GUI at `http://localhost:5555` where you can:
- View all records
- Create new records
- Edit existing records
- Delete records

### Seed Database (Optional)
Create `prisma/seed.ts` to populate sample data:
```ts
import { prisma } from '@/lib/db'

async function main() {
  // Create sample courses
  await prisma.course.create({
    data: {
      title: 'Sample Course',
      description: 'A sample course',
      instructor: 'John Doe',
      price: 99,
      level: 'Beginner',
      category: 'Technology',
    },
  })
}

main()
```

Run with:
```bash
npx prisma db seed
```

## 🔐 Security Best Practices

1. **Change JWT Secret**: Update `JWT_SECRET` in `.env.local`
2. **Use HTTPS**: Always use HTTPS in production
3. **Secure Cookies**: Cookies are automatically secured in production
4. **Input Validation**: All forms are validated client and server-side
5. **Password Hashing**: Passwords are hashed with bcrypt
6. **Environment Variables**: Never commit `.env.local` to Git

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 🎉 You're All Set!

Your AI Learn NG LMS is now running! Start exploring:

- 🏠 Landing Page: http://localhost:3000
- 📚 Courses: http://localhost:3000/courses
- 📋 Contact: http://localhost:3000/contact
- 👤 Sign Up: http://localhost:3000/sign-up
- 🔐 Sign In: http://localhost:3000/sign-in

## 💡 Tips

- Use DevTools to inspect network requests and debug
- Check browser console for any errors
- Use Prisma Studio to manage database
- Read component files to understand the architecture
- Customize colors in `tailwind.config.ts`
- Add new pages by creating folders in `app/`

## 📞 Support

Need help? Check the main [README.md](./README.md) for more information.

---

**Happy Coding! 🚀**
