import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // 💡 Safely targeting your environment API variables
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
});

export const { signIn, signUp, signOut, useSession } = authClient;