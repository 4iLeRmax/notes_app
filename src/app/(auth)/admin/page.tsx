import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import React from "react";

export default async function AdminPage() {
  const users = await prisma.user.findMany();

  if (!users) {
    return <div>No users found.</div>;
  }

  return (
    <>
      <div className="text-txt-primary">
        <h1 className="text-2xl font-bold mb-4 ">Admin Page</h1>
        <div>{users.length} users found.</div>
        <div className="flex flex-col gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4 p-4 rounded-3xl bg-secondary shadow-outside"
            >
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
