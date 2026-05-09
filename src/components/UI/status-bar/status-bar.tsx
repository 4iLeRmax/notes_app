import cn from "@/lib/cn";
import { CircleAlert, CircleCheck, CircleX } from "lucide-react";
import React from "react";

interface StatusBarProps {
  status: "success" | "error" | "pending";
  title: string;
  description: React.ReactNode;
}

export default function StatusBar({
  status,
  title,
  description,
}: StatusBarProps) {
  return (
    <>
      <div
        className={cn(
          "bg-secondary shadow-outside px-8 xs:px-16 py-4 xs:py-8 rounded-4xl w-120 text-center",
          {
            "border-custom-green border": status === "success",
            "border-custom-red border": status === "error",
            "border-custom-yellow border": status === "pending",
          },
        )}
      >
        <div className="flex items-center justify-center">
          {status === "success" ? (
            <CircleCheck size={60} className="text-custom-green" />
          ) : null}
          {status === "error" ? (
            <CircleX size={60} className="text-custom-red" />
          ) : null}
          {status === "pending" ? (
            <CircleAlert size={60} className="text-custom-yellow" />
          ) : null}
        </div>
        <div className="flex flex-col items-center justify-center mt-2">
          <h1 className="text-txt-primary text-2xl font-bold">{title}</h1>
          {typeof description === "string" ? (
            <p className="text-txt-secondary">{description}</p>
          ) : (
            description
          )}
        </div>
      </div>
    </>
  );
}
