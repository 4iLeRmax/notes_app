// "use client";

// import { NotebookText } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import LabelGroup from "./label-group";
// import ViewModeSwitcher from "../notes-view-mode/view-mode-switcher";
// import AsideToggleButton from "./aside-toggle-button";
// import cn from "@/lib/cn";
// import AsideLink from "./aside-link";
// import EditLabels from "./edit-labels/edit-labels";
// import ThemeSwitcher from "../header/theme-switcher";

// export default function AsideSection() {
//   const [menuIsOpen, setMenuIsOpen] = useState(false);

//   useEffect(() => {
//     const asideMenuOpen = localStorage.getItem("asideMenuOpen");
//     if (asideMenuOpen !== null) {
//       setMenuIsOpen(JSON.parse(asideMenuOpen));
//     }
//   }, []);

//   const handleToggleOpen = () => {
//     setMenuIsOpen((p) => {
//       localStorage.setItem("asideMenuOpen", JSON.stringify(!p));
//       return !p;
//     });
//   };

//   return (
//     <>
//       <div
//         className={cn("ml-5 shrink-0", {
//           "xs:w-[73px]": !menuIsOpen,
//           "xs:w-60": menuIsOpen,
//         })}
//       ></div>

//       <div
//         data-aside
//         className={cn(
//           "fixed z-40 top-0 left-5 ",
//           "py-4 mt-5",
//           "bg-primary shadow-outside rounded-4xl select-none outline-none",
//           {
//             "w-[73px]": !menuIsOpen,
//             "w-60": menuIsOpen,
//           },
//         )}
//       >
//         <div className="flex flex-col items-start gap-4 text-txt-primary justify-start">
//           <div className="px-4">
//             <AsideToggleButton
//               isOpen={menuIsOpen}
//               toggle={handleToggleOpen}
//               iconSize={25}
//             />
//           </div>
//           <div className="hidden xs:flex">
//             <div className="w-full px-4">
//               <AsideLink
//                 link="/notes"
//                 label="Notes"
//                 menuIsOpen={menuIsOpen}
//                 icon={<NotebookText size={25} />}
//               />
//             </div>
//             <LabelGroup menuIsOpen={menuIsOpen} />
//             <div className="w-full px-4">
//               <EditLabels menuIsOpen={menuIsOpen} />
//             </div>
//             <div className="w-full px-4">
//               <ThemeSwitcher />
//             </div>
//             <div className="px-4">
//               <ViewModeSwitcher iconSize={25} />
//             </div>
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
import ThemeSwitcher from "../header/theme-switcher";

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
        className={cn("ml-5 shrink-0", {
          "w-[73px]": !menuIsOpen,
          "w-60": menuIsOpen,
        })}
      ></div>

      <div
        data-aside
        className={cn(
          "fixed z-30 top-0 left-5 ",
          "py-4 mt-5",
          "bg-primary shadow-outside rounded-4xl select-none outline-none",
          {
            "w-[73px]": !menuIsOpen,
            "w-60": menuIsOpen,
          },
        )}
      >
        <div className="flex flex-col items-start gap-4 text-txt-primary justify-start">
          <div className="px-4">
            <AsideToggleButton
              isOpen={menuIsOpen}
              toggle={handleToggleOpen}
              iconSize={25}
            />
          </div>
          <div className="w-full px-4">
            <AsideLink
              link="/notes"
              label="Notes"
              menuIsOpen={menuIsOpen}
              icon={<NotebookText size={25} />}
            />
          </div>

          <LabelGroup menuIsOpen={menuIsOpen} />
          <div className="w-full px-4">
            <EditLabels menuIsOpen={menuIsOpen} />
          </div>
          <div className="w-full px-4">
            <ThemeSwitcher iconSize={25} />
          </div>
          <div className="px-4">
            <ViewModeSwitcher iconSize={25} />
          </div>
        </div>
      </div>
    </>
  );
}
