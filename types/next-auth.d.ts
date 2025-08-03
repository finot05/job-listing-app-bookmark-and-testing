// types/next-auth.d.ts or next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;  // override user in session with your User type
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    accessToken?: string;
    refreshToken?: string;
    role?: string;
    profileStatus?: string;
    profileComplete?: boolean;
    profilePicUrl?: string;
  }
}
