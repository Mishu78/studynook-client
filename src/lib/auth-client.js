import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || process.env.BETTER_AUTH_URL,
});

// 💡 Export cleanly from the shared instance created above
export const { signIn, signUp, signOut, useSession } = authClient;