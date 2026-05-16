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
          "bg-secondary shadow-outside px-8 xs:px-16 py-8 rounded-4xl max-w-120 text-center relative border-2",
          {
            "border-custom-green": status === "success",
            "border-custom-red": status === "error",
            "border-custom-yellow": status === "pending",
          },
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center",
            "absolute -top-[30px] left-1/2 -translate-x-1/2 bg-secondary rounded-full",
          )}
        >
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
        <div className="w-[60px] h-[60px] rounded-full bg-secondary absolute -z-10 -top-[30px] left-1/2 -translate-x-1/2 shadow-outside"></div>
        <div className="flex flex-col items-center justify-center mt-2">
          <h1 className="text-txt-primary text-2xl font-bold">{title}</h1>
          {typeof description === "string" ? (
            <p className="text-txt-primary">{description}</p>
          ) : (
            description
          )}
        </div>
      </div>
    </>
  );
}
