"use client";

import { useNotesStore } from "@/lib/store/useNotesStore";
import React, { useEffect } from "react";

export default function LabelHydrateClient({ labels }: { labels: Label[] }) {
  const setLabels = useNotesStore((s) => s.setLabels);

  useEffect(() => {
    setLabels(labels);
  }, [labels, setLabels]);

  return null;
}
