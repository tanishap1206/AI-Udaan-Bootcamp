'use client'

import { RegistrationForm } from '@/components/forms/RegistrationForm'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated gradient backgrounds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top gradient blob */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl opacity-60 animate-pulse" />

        {/* Bottom gradient blob */}
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl opacity-60 animate-pulse" />

        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl opacity-40" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40" />
      </div>

      {/* Toast Container (will be placed here for toast notifications) */}
      <div id="toast-container" className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm" />

      {/* Content */}
      <RegistrationForm />
    </div>
  )
}
