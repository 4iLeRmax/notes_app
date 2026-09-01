"use client";

import { getLabels } from "@/lib/actions/label";
import { authClient } from "@/lib/auth-client";
import { useNotesStore } from "@/lib/store/useNotesStore";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

export default function LabelHydrate() {
  const setLabels = useNotesStore((s) => s.setLabels);
  const session = authClient.useSession();
  const userId = session.data?.user.id;

  const { data: labels } = useQuery({
    queryKey: ["labels", userId],
    queryFn: async () => await getLabels(),
    staleTime: 0,
    gcTime: 0,
  });

  useEffect(() => {
    if (labels) setLabels(labels);
  }, [labels, setLabels]);

  return null;
}
