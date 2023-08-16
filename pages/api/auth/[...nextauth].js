import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import prisma from "@/components/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
const logger = require('@/components/utils/logger')



export default NextAuth({
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials

        try {
          const user = await prisma.photographer.findUnique({
            where: {
              email: email,
            }
          })
          if (!user) { return null }

          const isPasswordValid = await bcrypt.compare(password, user.password)
          if (!isPasswordValid) { return null }

          return user

        } catch (error) {
          logger.logger.log('error', error)
          return null
        } finally{
          await prisma.$disconnect()
        }

      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],
  secret: process.env.JWT_SECRET,
  database: process.env.DATABASE_URL,
  adapter: PrismaAdapter(prisma),
})