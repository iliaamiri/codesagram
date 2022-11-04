// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import crypto from "crypto"

export default NextAuth({
  secret: crypto.randomBytes(48).toString('hex'),
  providers: [
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
})