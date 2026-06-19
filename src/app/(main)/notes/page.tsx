import CreateNote from "@/components/create-note/create-note";
import NotesDisplay from "@/components/note/notes-display";

interface NotesPageProps {
  searchParams: Promise<{ q: string }>;
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const query = (await searchParams).q || "";

  return (
    <>
      <div className="flex flex-col">
        <div className="w-full sm:w-[calc(100%-155px-20px)] lg:w-full flex items-center justify-start lg:justify-center">
          <CreateNote />
        </div>
        <NotesDisplay query={query} />
      </div>
    </>
  );
}
