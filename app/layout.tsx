import './globals.css'
import { TopHeader } from '@/components/ui/TopHeader'
import { Footer } from '@/components/shared/footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { ToastProvider } from '@/components/providers/ToastContext'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Learn NG - Premium Learning Platform',
  description: 'Master new skills with expert instructors on our premium glassmorphism learning platform.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="50" dominant-baseline="middle" text-anchor="middle" font-size="90">🎓</text></svg>' />
        <link href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' rel='stylesheet' />
      </head>
      <body>
        <ToastProvider>
          <div className='fixed inset-x-0 top-0 z-50'>
            <TopHeader />
          </div>
          <main className='pt-24'>
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </ToastProvider>
      </body>
    </html>
  )
}
