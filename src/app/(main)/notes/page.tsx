import CreateNote from "@/components/create-note/create-note";
import NotesDisplay from "@/components/note-card/notes-display";
import { NoteDisplaySkeleton } from "@/components/UI/skeletons";
import { Suspense } from "react";

interface NotesPageProps {
  searchParams: Promise<{ q: string }>;
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const query = (await searchParams).q || "";
  return (
    <>
      <div>
        <div className="w-full sm:w-[calc(100%-98px-20px)] lg:w-full flex items-center justify-start lg:justify-center">
          <CreateNote />
        </div>
        <Suspense fallback={<NoteDisplaySkeleton />}>
          <NotesDisplay query={query} />
        </Suspense>
      </div>
    </>
  );
}
