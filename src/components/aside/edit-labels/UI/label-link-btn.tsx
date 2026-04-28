import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

interface LabelLinkBtnProps {
  labelId: string;
}

export default function LabelLinkBtn({ labelId }: LabelLinkBtnProps) {
  return (
    <>
      <Link href={`/labels/${labelId}`}>
        <ExternalLink size={20} />
      </Link>
    </>
  );
}
