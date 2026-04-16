// import User from "./user/user";
// import ConditionalSearch from "./search/conditional-search";
// import ThemeSwitcher from "./theme-switcher";
// import SelectNotesSection from "./select-notes/select-notes-section";
// import cn from "@/lib/cn";

// export default function Header() {
//   return (
//     <>
//       <div className={cn("fixed z-30 top-0 right-0", "")}>
//         <div data-header="true" className="p-5 flex items-start gap-4">
//           <SelectNotesSection>
//             <>
//               <ConditionalSearch />
//               <ThemeSwitcher />
//               <User />
//             </>
//           </SelectNotesSection>
//         </div>
//       </div>
//     </>
//   );
// }
"use client";

import User from "./user/user";
import ConditionalSearch from "./search/conditional-search";
import ThemeSwitcher from "./theme-switcher";
import SelectNotesSection from "./select-notes/select-notes-section";
import cn from "@/lib/cn";
import useSelectedNotesStore from "@/lib/store/useSelectedNotesStore";

export default function Header() {
  const { selectedNotes } = useSelectedNotesStore();

  return (
    <>
      <div className={cn("fixed z-30 top-5 right-5")}>
        {selectedNotes.length === 0 ? (
          <div
            data-header="true"
            className="flex items-start justify-end gap-4"
          >
            <ConditionalSearch />
            <User />
          </div>
        ) : (
          <SelectNotesSection />
        )}
      </div>
    </>
  );
}
