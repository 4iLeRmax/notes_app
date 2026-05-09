"use client";

import { DEBOUNCE_VALUE } from "@/lib/constants";
import { useEffect, useRef, useState, useTransition } from "react";
import { useDebounce } from "use-debounce";

export const useAutoSubmit = <T>(
  action: (value: T) => Promise<void>,
  initialValue: T,
  delay: number = DEBOUNCE_VALUE,
) => {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue] = useDebounce(value, delay);
  const [isPending, startTransition] = useTransition();
  const prevValueRef = useRef(debouncedValue);

  useEffect(() => {
    if (prevValueRef.current === debouncedValue) return;
    prevValueRef.current = debouncedValue;

    startTransition(() => {
      action(debouncedValue);
    });
  }, [debouncedValue]);

  return {
    value,
    setValue,
    isPending,
  };
};
