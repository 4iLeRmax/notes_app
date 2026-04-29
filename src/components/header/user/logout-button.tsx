import { SignOutAction } from "@/lib/actions/auth";
import { authClient } from "@/lib/auth-client";
import cn from "@/lib/cn";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function LogoutButton() {
  const router = useRouter();

  // const logout = () =>
  //   authClient.signOut({
  //     fetchOptions: {
  //       onSuccess: () => router.push("/sign-in"),
  //     },
  //   });

  return (
    <>
      <button
        onClick={SignOutAction}
        className={cn(
          "flex items-center justify-center px-4 py-2 rounded-2xl gap-2 y shadow-outside-small",
          "w-full bg-custom-blue text-primary",
          "sm:max-w-60 sm:py-1 sm:bg-primary sm:text-txt-primary",
        )}
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </>
  );
}
