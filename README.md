
# AI Learn NG - Premium Learning Management System

A modern, premium Learning Management System (LMS) built with Next.js 14, React 18, and featuring a beautiful glassmorphism UI design. This platform provides a complete learning experience with course management, user authentication, progress tracking, and more.

## 🌟 Features

### 🎨 Premium UI/UX
- **Glassmorphism Design**: Modern glass-effect components with blur and transparency
- **Responsive Layout**: Fully responsive design for mobile, tablet, and desktop
- **Smooth Animations**: Framer Motion animations for smooth transitions
- **Dark Mode**: Beautiful dark theme optimized for learning

### 📚 Core Features
- **User Authentication**: Secure JWT-based authentication
- **Course Management**: Browse, filter, and enroll in courses
- **Dashboard**: Personalized learning dashboard with progress tracking
- **Progress Tracking**: Visual progress indicators for courses
- **User Profiles**: Customizable user profiles and preferences
- **Responsive Sidebar**: Navigation sidebar with multiple sections
- **Contact Form**: Email contact form with validation
- **Search & Filters**: Advanced course search and filtering

### 🎯 Pages & Routes

#### Public Pages
- `/` - Landing page with hero, features, testimonials
- `/courses` - Browse and filter courses
- `/contact` - Contact us page
- `/privacy-policy` - Privacy policy page

#### Authentication Pages
- `/sign-in` - Sign in with credentials
- `/sign-up` - Create new account

#### Protected Pages
- `/dashboard` - User dashboard with overview cards, progress, and achievements
- `/dashboard/learning` - My learning page (expandable)
- `/dashboard/messages` - Messages page (expandable)
- `/dashboard/certificates` - Certificates page (expandable)
- `/dashboard/settings` - Settings page (expandable)

### 🔌 API Routes

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (requires auth)

#### Courses
- `GET /api/courses` - Get courses with filtering and search
- `POST /api/courses` - Create new course (admin)

#### Contact
- `POST /api/contact` - Submit contact form

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **Animations**: Framer Motion
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **HTTP Client**: axios, js-cookie

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Step 1: Clone/Navigate to Repository
```bash
cd ai-learn-ng-lms
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Environment Configuration
Create a `.env.local` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-key-change-in-production-12345"
```

### Step 4: Setup Database
```bash
npm run prisma:generate
npm run prisma:migrate
```

This will:
1. Generate Prisma client
2. Create SQLite database
3. Apply all migrations

### Step 5: Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🚀 Production Deployment

### Building for Production
```bash
npm run build
npm start
```

### Environment Variables (Production)
Update `.env.local` with production values:
```env
DATABASE_URL="your-production-db-url"
JWT_SECRET="your-very-secure-production-secret"
```

### Deployment Platforms
- **Vercel**: Recommended for Next.js
  ```bash
  npm i -g vercel
  vercel
  ```
- **Netlify**: Supported with static export
- **Docker**: Create Dockerfile for custom deployments

## 📁 Project Structure

```
ai-learn-ng-lms/
├── app/
│   ├── (auth)/              # Authentication routes group
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (main)/              # Protected routes group
│   │   ├── courses/
│   │   ├── dashboard/
│   │   ├── privacy-policy/
│   ├── api/                 # API routes
│   │   ├── auth/
│   │   │   ├── register/
│   │   │   ├── login/
│   │   │   └── me/
│   │   ├── courses/
│   │   └── contact/
│   ├── contact/
│   ├── privacy-policy/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── globals.css
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── navbar.tsx
│   ├── shared/              # Shared components
│   │   ├── glass-card.tsx
│   │   ├── course-card.tsx
│   │   ├── sidebar.tsx
│   │   └── footer.tsx
│   └── landing/             # Landing page components
│       ├── hero.tsx
│       ├── features.tsx
│       ├── testimonials.tsx
│       ├── cta.tsx
│       └── courses-preview.tsx
├── hooks/                   # Custom React hooks
│   ├── useAuth.ts
│   └── useToast.ts
├── lib/
│   ├── db.ts               # Prisma client
│   ├── utils.ts            # Utility functions
│   └── auth/
│       └── jwt.ts          # JWT utilities
├── types/                  # TypeScript type definitions
│   └── index.ts
├── prisma/
│   └── schema.prisma       # Database schema
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🗄️ Database Schema

### User
- `id`: Unique identifier (CUID)
- `name`: User's full name
- `email`: User's email (unique)
- `password`: Hashed password
- `image`: Profile image URL
- `bio`: User biography
- `role`: User role (default: 'student')
- `createdAt`: Account creation date
- `updatedAt`: Last update date

### Course
- `id`: Unique identifier
- `title`: Course title
- `description`: Course description
- `price`: Course price (default: 0)
- `image`: Course image URL
- `instructor`: Instructor name
- `duration`: Course duration (e.g., '12 weeks')
- `level`: Difficulty level (Beginner/Intermediate/Advanced)
- `category`: Course category
- `students`: Number of enrolled students
- `rating`: Average rating

### Enrollment
- `id`: Unique identifier
- `userId`: Reference to User
- `courseId`: Reference to Course
- `status`: Enrollment status (active/completed)
- `progress`: Course progress percentage
- `createdAt`: Enrollment date
- `updatedAt`: Last update date

### Progress
- `id`: Unique identifier
- `userId`: Reference to User
- `courseId`: Reference to Course
- `lessonsCompleted`: Number of completed lessons
- `totalLessons`: Total number of lessons
- `percentage`: Progress percentage
- `lastAccessed`: Last access date

## 🔐 Authentication Flow

1. **Registration**: User creates account at `/sign-up`
   - Passwords are hashed with bcrypt
   - JWT token is generated and stored in cookies

2. **Login**: User signs in at `/sign-in`
   - Credentials are verified
   - JWT token is generated and stored

3. **Protected Routes**: Authenticated requests include JWT token
   - Token is verified in API routes
   - User information is extracted from token

4. **Logout**: User logs out from dashboard
   - Cookie is removed
   - User is redirected to home page

## 🎨 Customization

### Tailwind CSS Configuration
Edit `tailwind.config.ts` to customize:
- Colors and gradients
- Glassmorphism effects
- Animation timings
- Responsive breakpoints

### Component Styling
All components use Tailwind CSS classes. Glass effect components follow the pattern:
- `.glass-container` - Main container
- `.glass-card` - Card component
- `.glass-button` - Button styles
- `.glass-input` - Input fields

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Performance Optimizations

- Code splitting with dynamic imports
- Image optimization with Next.js Image
- Database query optimization
- CSS minification with Tailwind
- API response caching (configurable)

## 🧪 Testing

### Development Testing
```bash
npm run dev
```

Then visit different pages to test functionality:
1. Landing page load and animations
2. Sign up and registration
3. Sign in and authentication
4. Dashboard functionality
5. Course browsing and filtering
6. Contact form submission

### Manual Test Cases

#### Authentication
- [ ] Register new user
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Logout functionality
- [ ] Session persistence

#### Courses
- [ ] Browse all courses
- [ ] Filter by category
- [ ] Filter by level
- [ ] Search courses
- [ ] Course details view

#### Dashboard
- [ ] View overview cards
- [ ] Check progress on courses
- [ ] Access recent courses
- [ ] View achievements

## 🔧 Troubleshooting

### Database Issues
```bash
# Reset database
rm prisma/dev.db
npm run prisma:migrate
```

### Build Issues
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Port Already in Use
```bash
# Change port
PORT=3001 npm run dev
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🎯 Future Enhancements

- [ ] Video course content
- [ ] Quiz and assignments
- [ ] Discussion forums
- [ ] Email notifications
- [ ] Payment integration
- [ ] Mobile app
- [ ] Live classes
- [ ] Advanced analytics
- [ ] Social login
- [ ] Course recommendations

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email support@ailearn.ng or join our community discussions.

---

**Built with ❤️ by the AI Learn NG Team**

