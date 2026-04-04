// Shared OTP store for send-otp and verify-otp endpoints
// In production, use a database (MongoDB, PostgreSQL, Redis) instead

interface OTPEntry {
  code: string
  expiresAt: number
}

class OTPService {
  private store: Map<string, OTPEntry> = new Map()

  generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  storeOTP(email: string, otp: string, expiryMinutes: number = 10): void {
    const expiresAt = Date.now() + expiryMinutes * 60 * 1000
    this.store.set(email.toLowerCase(), { code: otp, expiresAt })
  }

  verifyOTP(email: string, otp: string): { valid: boolean; message: string } {
    const lowerEmail = email.toLowerCase()
    const storedOtp = this.store.get(lowerEmail)

    if (!storedOtp) {
      return { valid: false, message: 'No OTP found for this email. Please request a new OTP.' }
    }

    if (Date.now() > storedOtp.expiresAt) {
      this.store.delete(lowerEmail)
      return { valid: false, message: 'OTP has expired. Please request a new OTP.' }
    }

    if (otp.trim() !== storedOtp.code) {
      return { valid: false, message: 'Invalid OTP. Please try again.' }
    }

    // OTP is valid, remove it
    this.store.delete(lowerEmail)
    return { valid: true, message: 'Email verified successfully!' }
  }

  removeOTP(email: string): void {
    this.store.delete(email.toLowerCase())
  }

  clearExpiredOTPs(): void {
    const now = Date.now()
    for (const [email, data] of this.store.entries()) {
      if (now > data.expiresAt) {
        this.store.delete(email)
      }
    }
  }
}

// Export singleton instance
export const otpService = new OTPService()
