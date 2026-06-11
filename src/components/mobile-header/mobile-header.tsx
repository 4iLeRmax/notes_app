// "use client";

// import React, { Activity, Suspense, useEffect, useState } from "react";
// import User from "../header/user/user";
// import ConditionalSearch from "../header/search/conditional-search";
// import MobileMenu from "./menu/mobile-menu";
// import useSelectedNotesStore from "@/lib/store/useSelectedNotesStore";
// import SelectNotesSection from "../header/select-notes/select-notes-section";
// import { UserIconSkeleton } from "../UI/skeletons";
// import cn from "@/lib/cn";
// import { AnimatePresence, motion } from "motion/react";
// import { usePathname } from "next/navigation";

// export default function MobileHeader() {
//   const [menuIsOpen, setMenuIsOpen] = useState(false);
//   const selectedNoteIds = useSelectedNotesStore((s) => s.selectedNoteIds);
//   const pathname = usePathname();

//   const toggleMenuIsOpen = () => setMenuIsOpen((p) => !p);
//   const handleClose = () => setMenuIsOpen(false);

//   useEffect(() => {
//     handleClose();
//   }, [pathname]);

//   return (
//     <>
//       <div className="fixed top-0 left-0 z-30 w-full outline-none">
//         <MobileMenu
//           menuIsOpen={menuIsOpen}
//           toggleMenuIsOpen={toggleMenuIsOpen}
//           handleClose={handleClose}
//         />
//       </div>

//       <motion.div animate={{ display: menuIsOpen ? "none" : "flex" }}>
//         <div className="fixed top-3 right-3 z-30">
//           <div className="flex items-center gap-4">
//             {selectedNoteIds.length === 0 ? (
//               <div data-header="true" className="flex items-start gap-4">
//                 <ConditionalSearch />
//                 <Suspense fallback={<UserIconSkeleton />}>
//                   <User />
//                 </Suspense>
//               </div>
//             ) : (
//               <SelectNotesSection />
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </>
//   );
// }
"use client";

import React, { Activity, Suspense, useEffect, useState } from "react";
import User from "../header/user/user";
import ConditionalSearch from "../header/search/conditional-search";
import MobileMenu from "./menu/mobile-menu";
import useSelectedNotesStore from "@/lib/store/useSelectedNotesStore";
import SelectNotesSection from "../header/select-notes/select-notes-section";
import { UserIconSkeleton } from "../UI/skeletons";
import cn from "@/lib/cn";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

export default function MobileHeader() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const selectedNoteIds = useSelectedNotesStore((s) => s.selectedNoteIds);
  const pathname = usePathname();

  const toggleMenuIsOpen = () => setMenuIsOpen((p) => !p);
  const handleClose = () => setMenuIsOpen(false);

  useEffect(() => {
    handleClose();
  }, [pathname]);

  return (
    <>
      <div className="fixed top-0 left-0 z-30 w-full outline-none p-3 flex items-center justify-between">
        <MobileMenu
          menuIsOpen={menuIsOpen}
          toggleMenuIsOpen={toggleMenuIsOpen}
          handleClose={handleClose}
        />

        {selectedNoteIds.length === 0 ? (
          <div data-header="true" className="flex items-start gap-4">
            <ConditionalSearch />
            <Suspense fallback={<UserIconSkeleton />}>
              <User />
            </Suspense>
          </div>
        ) : (
          <SelectNotesSection />
        )}
      </div>
    </>
  );
}
