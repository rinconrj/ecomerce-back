/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import User from '../users/userSchema'

const env_salt = process.env.SALT

export const tokenVerification = async (req: Request, res: Response, next: NextFunction) => {
  const { user, autorization } = req.headers
  if (!autorization) return res.status(401).json({ auth: false, message: 'No token provided.' })
  const authorized = await validateToken(autorization, user)
  if (!authorized) return res.status(401).json({ auth: false, message: 'Invalid Token' })
  next()
}

export const createToken = (encoded: string): string => {
  const token = jwt.sign(
    {
      token: encoded,
    },
    env_salt,
    {
      expiresIn: Math.floor(1000 * 60 * 60 * 24 * 60),
    }
  )
  return token
}

export const validateToken = (encoded: string, user: string): any => {
  try {
    const decoded = jwt.verify(encoded, env_salt)
    if (decoded) {
      const decriptedToken = JSON.parse(decrypt(decoded.token, user))

      if (decriptedToken._id !== user) {
        throw Error()
      }
      return true
    }
  } catch (error) {
    return false
  }
}
export const isAdmin = async (userId: string) => {
  const admin = await User.findOne({ _id: userId, active: true, role: 'ADMIN_ROLE' }).lean()
  return admin
}

export const encodePassword = (plainText: string): string => {
  const salt = new Buffer(env_salt, 'base64')
  return crypto.pbkdf2Sync(plainText, salt, 1000, 64, 'sha512').toString('hex')
}

export const validatePassword = (plainText: string, hashedPassword: string): boolean => {
  const salt = new Buffer(env_salt, 'base64')
  return crypto.pbkdf2Sync(plainText, salt, 1000, 64, 'sha512').toString('hex') === hashedPassword
}

export const encrypt = (text: string, id: string): string => {
  const iv = crypto.randomBytes(16)
  const key = crypto.createHash('sha256').update(String(id)).digest('base64').substr(0, 32)
  const cipher = crypto.createCipheriv('aes-256-cbc', key.toString(), iv)
  let encrypted = cipher.update(text)

  encrypted = Buffer.concat([encrypted, cipher.final()])
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`
}

export const decrypt = (text: string, id: string): string => {
  const textParts: any = text.split(':')
  const iv = Buffer.from(textParts.shift(), 'hex')
  const key = crypto.createHash('sha256').update(String(id)).digest('base64').substr(0, 32)
  const encryptedText = Buffer.from(textParts.join(':'), 'hex')
  const decipher = crypto.createDecipheriv('aes-256-cbc', key.toString(), iv)
  let decrypted = decipher.update(encryptedText)

  decrypted = Buffer.concat([decrypted, decipher.final()])

  return decrypted.toString()
}
