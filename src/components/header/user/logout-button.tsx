import { authClient } from "@/lib/auth-client";
import cn from "@/lib/cn";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function LogoutButton() {
  const router = useRouter();

  const logout = () =>
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/sign-in"),
      },
    });

  return (
    <>
      <button
        onClick={logout}
        className={cn(
          "flex items-center justify-center px-4 py-2 rounded-2xl gap-2 y shadow-outside-small",
          "w-full bg-custom-blue text-primary",
          "xs:max-w-60 xs:py-1 xs:bg-primary xs:text-txt-primary",
        )}
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </>
  );
}
