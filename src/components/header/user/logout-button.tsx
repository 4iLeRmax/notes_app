"use client";

import { SignOutAction } from "@/lib/actions/auth";
import cn from "@/lib/cn";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const queryClient = useQueryClient();

  const logout = async () => {
    await SignOutAction();
    queryClient.clear();
    window.location.href = "/sign-in";
  };

  return (
    <>
      <button
        onClick={logout}
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
