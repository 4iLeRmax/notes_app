"use client";

import { createLabel, getLabels } from "@/lib/actions/label";
import { getNoteById } from "@/lib/actions/note";
import dynamic from "next/dynamic";
import { Suspense, useActionState } from "react";
import LabelList from "./label-list";

// const LabelList = dynamic(() => import("@/components/label/label-list"), {
//   loading: () => <div>Loading...</div>,
//   ssr: false,
// });

interface CreateLabelProps {
  noteId: string;
  customRef: any;
}

export default function CreateLabel({ noteId, customRef }: CreateLabelProps) {
  console.log("render: CREATE LABEL");

  const [state, formAction, isPending] = useActionState(createLabel, null);

  return (
    <>
      <div className="p-4">
        <h1>Create label</h1>
        <form action={formAction}>
          <input
            ref={customRef}
            type="text"
            name="label"
            placeholder="label..."
          />
          <button>Create</button>
        </form>
        {state?.error ? (
          <div className="text-red-500">{state.error}</div>
        ) : null}
        <LabelList noteId={noteId} />
      </div>
    </>
  );
}
