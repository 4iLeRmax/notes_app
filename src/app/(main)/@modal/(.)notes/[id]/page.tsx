import { getNoteById, getNoteIds } from "@/lib/actions/note";

import TitleForm from "@/app/(main)/notes/[id]/components/title-form";
import { CloseModalOnNotFound } from "@/components/UI/dialog";
import NoteMoreMenu from "@/components/note-card/note-more-menu";
import NoteContent from "@/components/note-content";
import LastUpdate from "@/app/(main)/notes/[id]/components/last-update";
import BaseModal from "@/components/UI/base-modal";

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
        <BaseModal>
          <div className="w-screen xs:w-100 sm:w-150 bg-primary shadow-outside rounded-4xl pt-13 sm:pt-15 pb-4">
            <div className="px-4 sm:px-8">
              <TitleForm title={note.title} noteId={note.id} />
            </div>

            <div className="px-4 sm:px-8 py-1 max-h-[calc(3/5*100vh)] overflow-y-scroll mt-5">
              <NoteContent note={note} />
            </div>

            <div className="flex items-center justify-end gap-5 mt-2 px-8">
              <div className="w-full flex justify-end">
                <LastUpdate note={note} />
              </div>
              <NoteMoreMenu noteId={note.id} fixed />
            </div>
          </div>
        </BaseModal>
      ) : null}
    </>
  );
}
