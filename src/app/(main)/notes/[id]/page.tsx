import { getNoteById } from "@/lib/actions/note";
import { redirect } from "next/navigation";
import BackButton from "@/components/UI/back-button";
import { ArrowLeft } from "lucide-react";
import NoteViewLastUpdate from "@/components/note-view/note-view-last-update";
import NoteViewContent from "@/components/note-view/note-view-content";
import NoteViewTitleForm from "@/components/note-view/note-view-title-form";
import NoteOptions from "@/components/note-card/note-card-options/note-options";

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
      <div className="w-full flex items-center justify-center">
        <div className="w-full md:w-150 bg-secondary shadow-outside-small rounded-4xl pt-15 pb-4">
          <div className="flex items-center gap-4 px-4 sm:px-8">
            <BackButton className="p-2 shadow-outside-small rounded-3xl bg-primary text-txt-secondary">
              <ArrowLeft size={20} />
            </BackButton>
            <div className="w-full">
              <NoteViewTitleForm title={note.title} noteId={note.id} />
            </div>
          </div>

          <div className="px-4 sm:px-8 mt-5">
            <NoteViewContent note={note} />
          </div>

          <div className="flex items-center justify-end gap-5 mt-2 px-8">
            <div className="w-full flex justify-end">
              <NoteViewLastUpdate note={note} />
            </div>
            <NoteOptions noteId={note.id} />
          </div>
        </div>
      </div>
    </>
  );
}
