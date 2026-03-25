"use client";

import LogoutButton from "./logout-button";
import cn from "@/lib/cn";

interface UserModalProps {
  user: SessionUser;
}

export default function UserBar({ user }: UserModalProps) {
  return (
    <>
      <div className="fixed z-20 top-[calc(20px+41px+10px)] right-5 w-[calc(100%-40px)] xs:w-auto max-w-150 xs:min-w-100">
        <div className="bg-primary shadow-outside rounded-4xl p-4">
          <div className="flex items-center xs:items-start gap-4 flex-col xs:flex-row ">
            <div
              className={cn(
                "w-20 h-20 flex items-center justify-center rounded-full text-txt-primary shadow-outside_small text-4xl font-bold shrink-0 select-none",
                "xs:w-[41px] xs:h-[41px] xs:text-xl",
              )}
            >
              {user.name[0]}
            </div>
            <div className="flex flex-col ic xs:items-start w-auto xs:w-[calc(100%-16px-41px)]">
              <h1 className="text-txt-secondary text-2xl xs:text-xl font-bold shrink-0 w-full truncate">
                {/* ssssssssssssssssssssssssssssssssssssssssssssssssss */}
                {user.name}
              </h1>

              <p className="text-sm text-txt-primary text-center xs:text-start">
                {user.email}
              </p>
            </div>
          </div>

          <div className="w-full flex justify-center xs:justify-end mt-5">
            <LogoutButton />
          </div>
        </div>
      </div>
    </>
  );
}
