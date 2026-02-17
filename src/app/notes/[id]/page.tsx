import TextArea from "./components/textarea";
import { getNoteById } from "@/lib/actions/note";
import List from "./components/list";
import TitleForm from "./components/title-form";
import BackButton from "@/components/UI/back-button";
import { ArrowLeft } from "lucide-react";
import lastNoteUpdate from "@/lib/last-note-update";
import { redirect } from "next/navigation";
import NoteMoreMenu from "@/components/note-more-menu";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = await getNoteById(id);

  if (!note) redirect("/notes");

  return (
    <>
      {note ? (
        <div className="mt-10 flex flex-col items-center justify-center">
          <div className="w-150 flex items-center justify-between py-2">
            <BackButton>
              <ArrowLeft size={20} />
            </BackButton>
            <NoteMoreMenu noteId={note.id} />
          </div>
          <div className="w-150 py-2 border rounded-md">
            <div className="w-full px-2">
              <TitleForm title={note.title} noteId={note.id} />
            </div>
            <div className="mt-5">
              {note.type === "TEXT" ? (
                <TextArea list={note.content} />
              ) : (
                <List list={note.content} noteId={note.id} />
              )}
            </div>
            <div className="w-full flex justify-end px-2">
              <span className="text-sm text-gray-500">
                Last update: {lastNoteUpdate(note).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
