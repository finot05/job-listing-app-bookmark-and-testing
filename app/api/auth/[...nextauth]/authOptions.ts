import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { JWT } from "next-auth/jwt";

type ApiResponse = {
  data: User;
  count: number;
  errors: any;
  message: string;
  success: boolean;
};

type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  accessToken?: string;
  refreshToken?: string;
  role?: string;
  profileStatus?: string;
  profileComplete?: boolean;
  profilePicUrl?: string;
};

interface Token extends JWT {
  user?: User;
}

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const res = await fetch("https://akil-backend.onrender.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const response: ApiResponse = await res.json();
          const user: User = response.data;

          if (res.ok && user) {
            // Return only the user object, NOT the full response
            return user;
          }
          return null;
        } catch (err) {
          console.error("Login error:", err);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.user = user; // user has accessToken
    }
    return token;
  },
  async session({ session, token }) {
    session.user = token.user as User;
    return session;
  },
},
  secret: process.env.NEXTAUTH_SECRET,
};
