"use client";

import { useEffect, useState } from "react";
import UserInfo from "./user-info";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";

export default function User() {
  const session = authClient.useSession();
  console.log(session);

  if (!session.data) return null;

  return (
    <>
      <UserInfo user={session.data.user} />
    </>
  );
}
