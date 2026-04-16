"use client";

import React, { memo } from "react";
import MobileMenuEditLabels from "./mobile-menu-edit-labels";
import MobileMenuLabelList from "./mobile-menu-label-list";

function MobileMenuLabelGroup() {
  return (
    <>
      <div>
        <h1 className="text-txt-primary font-bold text-xl">Labels</h1>
        <div className="flex flex-col gap-4 mt-2">
          <MobileMenuEditLabels />
          <MobileMenuLabelList />
        </div>
      </div>
    </>
  );
}

export default memo(MobileMenuLabelGroup);
