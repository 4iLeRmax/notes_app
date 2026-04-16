// "use client";

// import { getLabels } from "@/lib/actions/label";
// import { useQuery } from "@tanstack/react-query";
// import { ChevronDown, ChevronUp, Tag, Tags } from "lucide-react";
// import Link from "next/link";
// import React, { Activity, useEffect, useState } from "react";
// import LabelItem from "./label-item";
// import cn from "@/lib/cn";

// interface LabelGroupProps {
//   menuIsOpen: boolean;
// }

// export default function LabelGroup({ menuIsOpen }: LabelGroupProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const { data: labels } = useQuery({
//     queryKey: ["labels"],
//     queryFn: async () => await getLabels(),
//   });

//   // useEffect(() => {
//   //   if (!menuIsOpen) {
//   //     setIsOpen(false);
//   //   }
//   // }, [menuIsOpen]);

//   return (
//     <>
//       <div className="w-full">
//         <div className="w-full px-4">
//           <button
//             onClick={() => {
//               setIsOpen((p) => !p);
//             }}
//             className={cn(
//               "w-full flex items-center justify-between rounded-2xl p-2",
//               {
//                 "shadow-outside-small": !isOpen,
//                 "shadow-inside": isOpen,
//               },
//             )}
//           >
//             <div className="flex items-center gap-2">
//               <Tags size={25} />
//               {menuIsOpen ? <span className="">Labels</span> : null}
//             </div>
//             {menuIsOpen ? (
//               isOpen ? (
//                 <ChevronUp size={20} />
//               ) : (
//                 <ChevronDown size={20} />
//               )
//             ) : null}
//           </button>
//         </div>
//         {labels ? (
//           <Activity mode={isOpen ? "visible" : "hidden"}>
//             <div
//               className={cn(
//                 "w-full flex flex-col items-start gap-4 h-[calc(100vh-301px-40px-16px)]",
//                 "mt-4 overflow-y-scroll snap-y snap-mandatory",
//                 {
//                   "pl-4 pr-2": !menuIsOpen,
//                   "pl-8 pr-4": menuIsOpen,
//                 },
//               )}
//             >
//               {labels.map((label) => (
//                 <LabelItem
//                   label={label}
//                   key={label.id}
//                   menuIsOpen={menuIsOpen}
//                 />
//               ))}
//             </div>
//           </Activity>
//         ) : null}
//       </div>
//     </>
//   );
// }
"use client";

import { getLabels } from "@/lib/actions/label";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronRight, ChevronUp, Tag, Tags } from "lucide-react";
import Link from "next/link";
import React, { Activity, useEffect, useState } from "react";
import LabelItem from "./label-item";
import cn from "@/lib/cn";

interface LabelGroupProps {
  menuIsOpen: boolean;
}

export default function LabelGroup({ menuIsOpen }: LabelGroupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: labels } = useQuery({
    queryKey: ["labels"],
    queryFn: async () => await getLabels(),
  });

  if (!labels || labels.length < 1) return null;

  // useEffect(() => {
  //   if (!menuIsOpen) {
  //     setIsOpen(false);
  //   }
  // }, [menuIsOpen]);

  return (
    <>
      <div className="w-full">
        <div className="px-4">
          <button
            onClick={() => {
              setIsOpen((p) => !p);
            }}
            className={cn(
              "h-[41px] flex items-center gap-2 p-2 rounded-3xl justify-between",
              {
                "shadow-outside-small": !isOpen,
                "shadow-inside": isOpen,
                "w-[41px]": !menuIsOpen,
                "w-full": menuIsOpen,
              },
            )}
          >
            <div className="flex items-center gap-2">
              <Tags size={25} />
              {menuIsOpen ? <span className="">Labels</span> : null}
            </div>
            {menuIsOpen ? (
              isOpen ? (
                <ChevronDown size={20} />
              ) : (
                <ChevronRight size={20} />
              )
            ) : null}
          </button>
        </div>
        {labels ? (
          <Activity mode={isOpen ? "visible" : "hidden"}>
            <div
              className={cn(
                "w-full flex flex-col items-start gap-4 max-h-[calc(100vh-358px-40px-16px)]",
                "mt-4 overflow-y-scroll snap-y snap-mandatory scrollbar-thin",
                {
                  "pl-4 pr-3": !menuIsOpen,
                  "pl-8 pr-5": menuIsOpen,
                },
              )}
            >
              {labels.map((label) => (
                <LabelItem
                  label={label}
                  key={label.id}
                  menuIsOpen={menuIsOpen}
                />
              ))}
            </div>
          </Activity>
        ) : null}
      </div>
    </>
  );
}
