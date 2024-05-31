import dotenv from 'dotenv';

dotenv.config({ path: '.env' })

export const PORT = process.env.PORT
export const JWT_SECRET = process.env.JWT_SECRET as string
export const DATABASE_URL = process.env.DATABASE_URL
export const SSL_KEY = process.env.SSL_KEY as string
export const SSL_CERT = process.env.CERT as string
