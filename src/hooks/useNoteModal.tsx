import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useNoteModal() {
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

  const activeNoteId = searchParams.get("noteId");

  return { activeNoteId, openNote, closeNote };
}
