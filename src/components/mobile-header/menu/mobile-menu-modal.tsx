// "use client";

// import MobileMenuUser from "./mobile-menu-user";
// import MobileMenuLabelGroup from "./labels/mobile-menu-label-group";
// import MobileMenuLinkGroup from "./mobile-menu-link-group";
// import { memo } from "react";
// import { motion } from "motion/react";
// import { DialogOverlay } from "@/components/UI/dialog";

// interface MobileMenuModalProps {
//   menuIsOpen: boolean;
//   handleClose: () => void;
//   // toggleMenuIsOpen: () => void;
// }

// function MobileMenuModal({ menuIsOpen, handleClose }: MobileMenuModalProps) {
//   return (
//     <>
//       {/* <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 -z-10 bg-black/30 backdrop-blur-xs"
//         onClick={handleClose}
//       ></motion.div> */}
//       <DialogOverlay handleClose={handleClose} />
//       <motion.div
//         initial={{ opacity: 0, height: 0 }}
//         animate={{ opacity: 1, height: "calc(100vh*0.9)" }}
//         exit={{ opacity: 0, height: 0 }}
//         className="fixed z-50 bg-primary w-full shadow-outside rounded-es-3xl rounded-ee-3xl"
//       >
//         <div className="px-2 pt-[81px] pb-10">
//           <div className="flex flex-col gap-8">
//             <MobileMenuUser />
//             <MobileMenuLinkGroup />
//             <MobileMenuLabelGroup />
//           </div>
//         </div>
//       </motion.div>
//     </>
//   );
// }

// export default memo(MobileMenuModal);
"use client";

import MobileMenuUser from "./mobile-menu-user";
import MobileMenuLabelGroup from "./labels/mobile-menu-label-group";
import MobileMenuLinkGroup from "./mobile-menu-link-group";
import { memo } from "react";
import { motion } from "motion/react";
import { DialogOverlay } from "@/components/UI/dialog";
import SyncDataBtn from "@/components/header/header-section/sync-data/sync-data";
import ThemeSwitcher from "@/components/UI/theme-switcher";
import ViewModeSwitcher from "@/components/notes-view-mode/view-mode-switcher";
import MobileMenuToggleBtn from "./mobile-menu-toggle-btn";

interface MobileMenuModalProps {
  menuIsOpen: boolean;
  handleClose: () => void;
  // toggleMenuIsOpen: () => void;
}

function MobileMenuModal({ menuIsOpen, handleClose }: MobileMenuModalProps) {
  return (
    <>
      <DialogOverlay handleClose={handleClose} />
      <motion.div
        layout
        initial={{ opacity: 0, y: -300 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -300 }}
        transition={{ type: "tween" }}
        className="fixed z-30 top-0 left-0 bg-primary w-full origin-top shadow-outside rounded-es-3xl rounded-ee-3xl px-3 pb-20"
      >
        <div className="flex items-center justify-end gap-4 text-txt-primary py-3 mb-5">
          <SyncDataBtn iconSize={25} mobileVersion />
          <ThemeSwitcher iconSize={25} />
          <ViewModeSwitcher iconSize={25} />
        </div>
        <div className="flex flex-col gap-8">
          <MobileMenuUser />
          <MobileMenuLinkGroup />
          <MobileMenuLabelGroup />
        </div>
      </motion.div>
    </>
  );
}

export default memo(MobileMenuModal);
