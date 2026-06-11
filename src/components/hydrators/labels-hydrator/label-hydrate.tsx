import { getLabels } from "@/lib/actions/label";
import React from "react";
import LabelHydrateClient from "./label-hydrate-client";

export default async function LabelHydrate() {
  const labels = await getLabels();

  return <LabelHydrateClient labels={labels ?? []} />;
}
