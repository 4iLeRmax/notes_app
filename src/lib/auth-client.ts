import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "https://notes-app-yz8o.vercel.app",
});
