import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  // baseURL: "https://www.zlatin.it.com",
  // baseURL: "https://notes-app-teal-xi.vercel.app",
  // baseURL: "https://gks7c3c8-3000.euw.devtunnels.ms/",
  baseURL: "http://localhost:3000",
});
