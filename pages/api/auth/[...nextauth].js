// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  secret: process.env.OAUTH_NEXT_SECRET,
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
}

export default NextAuth(authOptions)