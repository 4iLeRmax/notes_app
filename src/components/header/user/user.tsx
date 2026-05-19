"use client";

import UserInfo from "./user-info";
import { authClient } from "@/lib/auth-client";
import { UserIconSkeleton } from "@/components/UI/skeletons";

export default function User() {
  const session = authClient.useSession();

  if (session.isPending || !session.data) return <UserIconSkeleton />;

  return (
    <>
      <UserInfo user={session.data.user} />
    </>
  );
}
