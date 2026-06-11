"use client";

import { SignOutAction } from "@/lib/actions/auth";
import cn from "@/lib/cn";
import { useNotesStore } from "@/lib/store/useNotesStore";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const setNotes = useNotesStore((s) => s.setNotes);
  const setLabels = useNotesStore((s) => s.setLabels);

  const logout = async () => {
    await SignOutAction();
    setNotes([]);
    setLabels([]);
    window.location.href = "/sign-in";
  };

  return (
    <>
      <button
        onClick={logout}
        className={cn(
          "flex items-center justify-center px-4 py-2 rounded-2xl gap-2 y shadow-outside-small transition-colors",
          "w-full bg-custom-blue text-primary hover:text-custom-blue hover:bg-primary",
          "sm:max-w-60 sm:py-1",
        )}
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </>
  );
}
