import useSelectedNotesStore from "@/lib/store/useSelectedNotesStore";
import { useEffect } from "react";

export const useClickOutsideDeselected = () => {
  const removeAll = useSelectedNotesStore((s) => s.removeAll);
  const hasAnySelected = useSelectedNotesStore(
    (s) => s.selectedNoteIds.length > 0,
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest("[data-select-options]")) return;
      if (target.closest("[data-note-card]")) return;
      if (target.closest("[data-note-card-button]")) return;
      if (target.closest("[data-header]")) return;
      if (target.closest("[data-aside]")) return;
      if (target.closest("[data-more-btn]")) return;
      if (!hasAnySelected) return;

      removeAll();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [removeAll, hasAnySelected]);
};
