"use client";

import MobileMenuUser from "./mobile-menu-user";
import MobileMenuLabelGroup from "./labels/mobile-menu-label-group";
import MobileMenuLinkGroup from "./mobile-menu-link-group";
import { memo } from "react";

interface MobileMenuModalProps {
  menuIsOpen: boolean;
  handleClose: () => void;
  // toggleMenuIsOpen: () => void;
}

function MobileMenuModal({ menuIsOpen, handleClose }: MobileMenuModalProps) {
  return (
    <>
      <div
        className="fixed inset-0 -z-10 bg-black/30 backdrop-blur-xs"
        onClick={handleClose}
      ></div>
      <div className="bg-primary w-full h-[calc(100vh*0.9)] shadow-outside rounded-es-3xl rounded-ee-3xl">
        <div className="px-2 pt-[81px] pb-10">
          <div className="flex flex-col gap-8">
            <MobileMenuUser />
            <MobileMenuLinkGroup />
            <MobileMenuLabelGroup />
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(MobileMenuModal);
