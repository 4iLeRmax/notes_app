import NoteContent from "@/components/note-content";
import NoteMoreMenu from "@/components/note-card/note-more-menu";
import { getNoteById, getNoteIds } from "@/lib/actions/note";
import TitleForm from "./components/title-form";
import { redirect } from "next/navigation";
import LastUpdate from "./components/last-update";
import BackButton from "@/components/UI/back-button";
import { ArrowLeft } from "lucide-react";

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
      <div className="w-full flex items-center justify-center mt-10">
        <div className="w-screen xs:w-100 sm:w-150 bg-primary shadow-outside-small rounded-4xl pt-15 pb-4">
          <div className="flex items-center gap-4 px-4 sm:px-8">
            <BackButton className="p-2 shadow-outside-small rounded-3xl">
              <ArrowLeft size={20} />
            </BackButton>
            <div className="w-full">
              <TitleForm title={note.title} noteId={note.id} />
            </div>
          </div>

          <div className="px-4 sm:px-8 mt-5">
            <NoteContent note={note} />
          </div>

          <div className="flex items-center justify-end gap-5 mt-2 px-8">
            <div className="w-full flex justify-end">
              <LastUpdate note={note} />
            </div>
            <NoteMoreMenu noteId={note.id} fixed />
          </div>
        </div>
      </div>
    </>
  );
}
