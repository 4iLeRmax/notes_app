import cn from "@/lib/cn";
import { Check, DropletOff } from "lucide-react";
import React from "react";

interface NoteColorsListItemProps {
  color: Note["color"];
  handleChangeColor: (newColor: Note["color"]) => Promise<void>;
  variants: {
    default: boolean;
    customDefault: boolean;
    selectedColor: boolean;
  };
  size: number;
}

export default function NoteColorsListItem({
  color,
  variants,
  handleChangeColor,
  size,
}: NoteColorsListItemProps) {
  return (
    <>
      <div
        key={color}
        className="pl-4 sm:pl-0 last:pr-4 sm:last:pr-0 py-0 sm:py-2 snap-start"
      >
        <button
          key={color}
          className={cn(
            "rounded-full border-2 flex items-center justify-center shrink-0",
            {
              "border-transparent": variants.default,
              "border-txt-secondary": variants.customDefault,
              "border-custom-blue": variants.selectedColor,
            },
          )}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            background: color ?? "var(--bg-secondary)",
          }}
          onClick={() => handleChangeColor(color)}
        >
          {variants.customDefault && !variants.selectedColor ? (
            <DropletOff size={size * 0.5} className="text-txt-secondary" />
          ) : null}
          {variants.selectedColor ? (
            <Check size={size * 0.5} className="text-custom-blue" />
          ) : null}
        </button>
      </div>
    </>
  );
}
