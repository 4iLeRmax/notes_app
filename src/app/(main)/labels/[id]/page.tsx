import LabelNotes from "@/components/label-notes";
import React from "react";

interface LabelPageProps {
  params: Promise<{ id: string }>;
}

export default async function LabelPage({ params }: LabelPageProps) {
  const { id } = await params;

  return (
    <>
      <LabelNotes labelId={id} />
    </>
  );
}
