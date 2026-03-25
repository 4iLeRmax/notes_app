// "use client";

// import { NotebookText } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import LabelGroup from "./label-group";
// import ViewModeSwitcher from "../notes-view-mode/view-mode-switcher";
// import AsideToggleButton from "./aside-toggle-button";
// import cn from "@/lib/cn";
// import AsideLink from "./aside-link";
// import EditLabels from "./edit-labels";
// import { authClient } from "@/lib/auth-client";

// export default function AsideSection() {
//   const [menuIsOpen, setMenuIsOpen] = useState(false);

//   // const session = authClient.useSession();
//   // if (!session.data) return null;

//   useEffect(() => {
//     const asideMenuOpen = localStorage.getItem("asideMenuOpen");
//     if (asideMenuOpen !== null) {
//       setMenuIsOpen(JSON.parse(asideMenuOpen));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("asideMenuOpen", JSON.stringify(menuIsOpen));
//   }, [menuIsOpen]);

//   return (
//     <>
//       <div
//         className={cn("ml-5 shrink-0", {
//           "w-[73px]": !menuIsOpen,
//           "w-60": menuIsOpen,
//         })}
//       ></div>
//       <div
//         className={cn(
//           "fixed z-20 top-0 left-5",
//           "py-4 mt-5",
//           "bg-primary shadow-outside rounded-4xl select-none outline-none",
//           {
//             "w-[73px]": !menuIsOpen,
//             "w-60": menuIsOpen,
//           },
//         )}
//       >
//         <div className="flex flex-col items-start gap-4 text-txt-primary">
//           <div className="w-full px-4">
//             <AsideToggleButton
//               isOpen={menuIsOpen}
//               toggle={() => setMenuIsOpen((p) => !p)}
//               iconSize={25}
//             />
//             <AsideLink
//               link="/notes"
//               label="Notes"
//               menuIsOpen={menuIsOpen}
//               icon={<NotebookText size={25} />}
//             />
//           </div>
//           <LabelGroup menuIsOpen={menuIsOpen} />
//           <div className="w-full px-4">
//             <EditLabels menuIsOpen={menuIsOpen} />
//           </div>
//           <div className="px-4">
//             <ViewModeSwitcher iconSize={25} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
"use client";

import { NotebookText } from "lucide-react";
import React, { useEffect, useState } from "react";
import LabelGroup from "./label-group";
import ViewModeSwitcher from "../notes-view-mode/view-mode-switcher";
import AsideToggleButton from "./aside-toggle-button";
import cn from "@/lib/cn";
import AsideLink from "./aside-link";
import EditLabels from "./edit-labels/edit-labels";

export default function AsideSection() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    const asideMenuOpen = localStorage.getItem("asideMenuOpen");
    if (asideMenuOpen !== null) {
      setMenuIsOpen(JSON.parse(asideMenuOpen));
    }
  }, []);

  const handleToggleOpen = () => {
    setMenuIsOpen((p) => {
      localStorage.setItem("asideMenuOpen", JSON.stringify(!p));
      return !p;
    });
  };

  return (
    <>
      <div
        className={cn("xs:ml-5 shrink-0", {
          "xs:w-[73px]": !menuIsOpen,
          "xs:w-60": menuIsOpen,
        })}
      ></div>
      <div
        className={cn(
          "fixed z-20 top-auto xs:top-0 bottom-5 xs:bottom-auto left-5 px-4 xs:px-0",
          "py-4 mt-5",
          "bg-primary shadow-outside rounded-4xl select-none outline-none",
          {
            "w-[calc(100%-40px)] xs:w-[73px]": !menuIsOpen,
            "w-60": menuIsOpen,
          },
        )}
      >
        <div className="flex flex-row xs:flex-col items-start xs:gap-4 text-txt-primary justify-around xs:justify-start">
          <div className="xs:px-4">
            <AsideToggleButton
              isOpen={menuIsOpen}
              toggle={handleToggleOpen}
              iconSize={25}
            />
          </div>
          <div className="xs:w-full xs:px-4">
            <AsideLink
              link="/notes"
              label="Notes"
              menuIsOpen={menuIsOpen}
              icon={<NotebookText size={25} />}
            />
          </div>
          <LabelGroup menuIsOpen={menuIsOpen} />
          <div className="xs:w-full xs:px-4">
            <EditLabels menuIsOpen={menuIsOpen} />
          </div>
          <div className="xs:px-4">
            <ViewModeSwitcher iconSize={25} />
          </div>
        </div>
      </div>
    </>
  );
}
