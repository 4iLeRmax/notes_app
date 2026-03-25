import CreateNote from "@/components/create-note/create-note";
import NotesDisplay from "@/components/note-card/notes-display";
import { Suspense } from "react";

interface NotesPageProps {
  searchParams: Promise<{ q: string }>;
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const query = (await searchParams).q || "";
  return (
    <>
      <div>
        <div className="w-full flex items-center justify-center">
          <CreateNote />
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <NotesDisplay query={query} />
        </Suspense>
      </div>
    </>
  );
}
