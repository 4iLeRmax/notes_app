"use client";

import { authClient } from "@/lib/auth-client";
import cn from "@/lib/cn";
import React, { memo } from "react";

function MobileMenuUser() {
  const session = authClient.useSession();
  if (!session.data) return null;

  const user = session.data.user;
  const userFirstLetter = user.name[0];

  return (
    <>
      <div className="bg-primary rounded-4xl shadow-outside-small p-4">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex items-center justify-center rounded-full text-txt-primary shadow-outside-small font-bold shrink-0 select-none",
              "w-[60px] h-[60px] text-3xl",
            )}
          >
            {userFirstLetter}
          </div>
          <div className="flex flex-col items-start w-[calc(100%-60px-16px)] shrink-0">
            <h1 className="text-txt-secondary text-2xl xs:text-xl font-bold shrink-0 w-full truncate">
              {user.name}
            </h1>

            <p className="text-sm text-txt-primary text-center xs:text-start">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(MobileMenuUser);
