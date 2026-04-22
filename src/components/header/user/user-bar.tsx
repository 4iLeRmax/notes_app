"use client";

import LogoutButton from "./logout-button";
import cn from "@/lib/cn";

interface UserModalProps {
  user: SessionUser;
}

export default function UserBar({ user }: UserModalProps) {
  return (
    <>
      <div className="fixed z-20 top-[calc(20px+41px+10px)] right-3 sm:right-5 w-[calc(100%-24px)] sm:w-auto max-w-150 sm:min-w-100">
        <div className="bg-primary shadow-outside rounded-4xl p-4">
          <div className="flex items-center sm:items-start gap-2 flex-col sm:flex-row ">
            <div
              className={cn(
                "w-20 h-20 flex items-center justify-center rounded-full text-txt-primary shadow-outside-small text-4xl font-bold shrink-0 select-none",
                "sm:w-12 sm:h-12 sm:text-2xl",
              )}
            >
              {user.name[0]}
            </div>
            <div className="flex flex-col items-center sm:items-start w-auto sm:w-[calc(100%-8px-41px)]">
              <h1 className="text-txt-secondary text-2xl sm:text-xl font-bold shrink-0 w-full truncate">
                {/* ssssssssssssssssssssssssssssssssssssssssssssssssss */}
                {user.name}
              </h1>

              <p className="text-sm text-txt-primary text-center sm:text-start">
                {user.email}
              </p>
            </div>
          </div>

          <div className="w-full flex justify-center sm:justify-end mt-5">
            <LogoutButton />
          </div>
        </div>
      </div>
    </>
  );
}
