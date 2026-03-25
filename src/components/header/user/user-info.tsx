"use client";

import React, { useRef, useState } from "react";
import UserButton from "./user-button";
import UserBar from "./user-bar";

interface UserInfoProps {
  user: SessionUser;
}

export default function UserInfo({ user }: UserInfoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    setIsOpen((p) => !p);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.relatedTarget as Node)
    ) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div tabIndex={1} ref={containerRef} onBlur={handleBlur}>
        <UserButton
          userName={user.name}
          isActive={isOpen}
          toggleOpen={toggleOpen}
        />
        {isOpen ? <UserBar user={user} /> : null}
      </div>
    </>
  );
}
