import { getSession } from "@/lib/actions/auth";
import React from "react";
import UserInfo from "./user-info";

export default async function User() {
  const session = await getSession();
  if (!session) return null;

  return (
    <>
      <UserInfo user={session.user} />
    </>
  );
}
