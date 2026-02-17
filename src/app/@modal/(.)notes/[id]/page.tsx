import { getNoteById } from "@/lib/actions/note";

import lastNoteUpdate from "@/lib/last-note-update";

import TitleForm from "@/app/notes/[id]/components/title-form";
import TextArea from "@/app/notes/[id]/components/textarea";
import List from "@/app/notes/[id]/components/list";
import NoteMoreMenu from "@/components/note-more-menu";
import NoteModal from "@/components/note-modal";
import { CloseModalOnNotFound } from "@/components/UI/dialog";

export default async function InterceptRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = await getNoteById(id);

  return (
    <>
      <CloseModalOnNotFound noteExists={!!note} />
      {note ? (
        <NoteModal>
          <div className="p-4 flex flex-col items-center justify-center bg-primary shadow-2xl rounded-md border-2 border-gray-300">
            <div className="w-150 py-2 border rounded-md mt-6">
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
                  Last update: {lastNoteUpdate(note)}
                </span>
              </div>
            </div>
            <div className="flex w-full justify-end mt-2">
              <NoteMoreMenu noteId={note.id} fixed />
            </div>
          </div>
        </NoteModal>
      ) : null}
    </>
  );
}
