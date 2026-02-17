import { getLabels } from "@/lib/actions/label";
import prisma from "@/lib/prisma";
import React from "react";

export default async function OneRequestPage() {
  const NOTE_ID = "1ca7fe70-98b9-4bc8-8f7f-c4a593d3b654";
  const labels = await getLabels();

  return (
    <>
      <div>{labels?.length}</div>
    </>
  );
}
