import { BootcampHero } from '@/components/landing/bootcamp-hero'
import { WhatYouWillBuild } from '@/components/landing/what-you-build'
import { WhyThisBootcamp } from '@/components/landing/why-bootcamp'
import { AboutOrganizer } from '@/components/landing/about-organizer'
import { EnquireCTA } from '@/components/landing/enquire-cta'
import { ProgramStructure } from '@/components/landing/program-structure'
import { AISaasSession } from '@/components/landing/ai-saas-session'
import { AIContentFilmmaking } from '@/components/landing/ai-content-filmmaking'
import { BonusTools } from '@/components/landing/bonus-tools'
import { LiveDemo } from '@/components/landing/live-demo'
import { StudentActivity } from '@/components/landing/student-activity'
import { UseCases } from '@/components/landing/use-cases'
import { Earning } from '@/components/landing/earning'
import { FutureProgram } from '@/components/landing/future-program'
import { KeyMessage } from '@/components/landing/key-message'
import { LimitedSeats } from '@/components/landing/limited-seats'
import { FinalCTA } from '@/components/ui/CTABanner'
import { AIQuoteSection } from '@/components/landing/ai-quote-section'
import { GradientBlobs } from '@/components/landing/gradient-blobs'
import { RegistrationModal } from '@/components/ui/RegistrationModal'

export default function Home() {
  return (
    <div className='relative min-h-screen bg-slate-950 text-white overflow-hidden'>
      {/* Auto-popup Registration Modal */}
      <RegistrationModal />

      {/* Animated background */}
      <GradientBlobs />
      
      {/* Grid overlay */}
      <div className='fixed inset-0 pointer-events-none opacity-5'>
        <div className='absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-purple-500/10' />
      </div>

      <BootcampHero />
      <WhatYouWillBuild />
      <WhyThisBootcamp />
      <AIQuoteSection />
      <FinalCTA />
      <AboutOrganizer />
      <ProgramStructure />
      <AISaasSession />
      <AIContentFilmmaking />
      <BonusTools />
      <LiveDemo />
      <StudentActivity />
      <UseCases />
      <Earning />
      <FutureProgram />
      <KeyMessage />
      <LimitedSeats />
      <EnquireCTA />
    </div>
  )
}