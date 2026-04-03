import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const SALT_ROUNDS = 10

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function generateToken(userId: string, email: string): string {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '30d' })
}

export function verifyToken(token: string): {
  userId: string
  email: string
} | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string
      email: string
    }
    return decoded
  } catch {
    return null
  }
}

export function extractTokenFromHeader(header?: string): string | null {
  if (!header) return null
  const parts = header.split(' ')
  if (parts.length === 2 && parts[0] === 'Bearer') {
    return parts[1]
  }
  return null
}
