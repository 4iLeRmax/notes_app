import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function useNoteModal(
  activeNoteId: string,
  setActiveNoteId: (activeNoteId: string) => void,
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const openNote = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("noteId", id);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const closeNote = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("noteId");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [router, pathname, searchParams]);

  useEffect(() => {
    const noteId = searchParams.get("noteId");
    if (noteId) setActiveNoteId(noteId);
    else setActiveNoteId("");
  }, [searchParams]);

  useEffect(() => {
    if (activeNoteId !== "") openNote(activeNoteId);
    else closeNote();
  }, [activeNoteId]);
}
