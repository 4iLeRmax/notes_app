// "use client";

// import { Pencil } from "lucide-react";
// import React, { useState } from "react";
// import cn from "@/lib/cn";
// import BaseModal from "../UI/base-modal";
// import EditLabelsModal from "./edit-labels-modal";

// interface EditLabelsProps {
//   menuIsOpen: boolean;
// }

// export default function EditLabels({ menuIsOpen }: EditLabelsProps) {
//   const [modalIsOpen, setModalIsOpen] = useState(false);

//   return (
//     <>
//       {modalIsOpen ? (
//         <EditLabelsModal handleClose={() => setModalIsOpen(false)} />
//       ) : null}
//       <button
//         className={cn("w-full flex items-center gap-2 p-2 rounded-2xl ", {
//           "shadow-outside_small": !modalIsOpen,
//           "shadow-inside": modalIsOpen,
//         })}
//         onClick={() => setModalIsOpen((p) => !p)}
//       >
//         <Pencil size={25} />
//         {menuIsOpen ? <span>Edit Labels</span> : null}
//       </button>
//     </>
//   );
// }
"use client";

import { Pencil } from "lucide-react";
import React, { useState } from "react";
import cn from "@/lib/cn";
import BaseModal from "../../UI/base-modal";
import EditLabelsModal from "./edit-labels-modal";
import EditLabelsBtn from "./UI/edit-labels-btn";

interface EditLabelsProps {
  menuIsOpen: boolean;
}

export default function EditLabels({ menuIsOpen }: EditLabelsProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModalOpen = () => setModalIsOpen((p) => !p);

  return (
    <>
      {modalIsOpen ? (
        <EditLabelsModal handleClose={() => setModalIsOpen(false)} />
      ) : null}
      <EditLabelsBtn
        menuIsOpen={menuIsOpen}
        modalIsOpen={modalIsOpen}
        toggleModalOpen={toggleModalOpen}
      />
    </>
  );
}
