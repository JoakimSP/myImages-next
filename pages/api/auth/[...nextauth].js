import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/components/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
const logger = require('@/components/utils/logger');

// Credentials Provider Configuration
const credentialsProvider = CredentialsProvider({
  type: 'credentials',
  credentials: {
    email: { label: "email", type: "text" },
    password: { label: "Password", type: "password" }
  },
  async authorize(credentials, req) {
    const { email, password } = credentials;

    try {
      const user = await prisma.photographer.findUnique({
        where: { email }
      });
      if (!user) { return null }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) { return null }

      return user;

    } catch (error) {
      logger.log('error', {
        message: error.message,
        stack: error.stack
      });
      return null;
    } finally {
      await prisma.$disconnect();
    }
  }
});

// Google Provider Configuration
const googleProvider = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
});

// Next Auth Options
export const authOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [credentialsProvider, googleProvider],
  secret: process.env.JWT_SECRET,
  database: process.env.DATABASE_URL,
  adapter: PrismaAdapter(prisma),

  pages: {
    signIn: '/auth/signin', // Custom sign-in page path
    // ... you can override other pages if needed
  },
};

export default NextAuth(authOptions);
