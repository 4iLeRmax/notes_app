import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "https://notes-app-teal-xi.vercel.app",
  // baseURL: "http://localhost:3000",
});
