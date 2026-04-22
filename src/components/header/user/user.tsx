"use client";

import { useEffect, useState } from "react";
import UserInfo from "./user-info";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { UserIconSkeleton } from "@/components/UI/skeletons";

export default function User() {
  const session = authClient.useSession();

  if (!session.data) return <UserIconSkeleton />;

  return (
    <>
      <UserInfo user={session.data.user} />
    </>
  );
}
