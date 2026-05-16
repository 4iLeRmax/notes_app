// "use client";

// import React, { useState } from "react";
// import cn from "@/lib/cn";
// import { AnimatePresence, motion } from "motion/react";

// const defaultList = [
//   { id: 0, content: 10 },
//   { id: 1, content: 20 },
//   { id: 2, content: 30 },
//   { id: 3, content: 40 },
//   { id: 4, content: 50 },
//   { id: 5, content: 60 },
//   { id: 6, content: 70 },
//   { id: 7, content: 80 },
//   { id: 8, content: 90 },
//   { id: 9, content: 100 },
// ];

// export default function AdminPage() {
//   const [list, setList] = useState(defaultList);

//   const removeItem = (itemId: number) => {
//     setList((p) => [...p.filter((item) => item.id !== itemId)]);
//   };

//   const addNewItem = () => {
//     setList((p) => [
//       ...p,
//       { id: p[p.length - 1].id + 1, content: p[p.length - 1].content + 10 },
//     ]);
//   };

//   return (
//     <>
//       <div className="flex items-center justify-center mt-10">
//         <button onClick={addNewItem} className="text-txt-primary">
//           Add new item
//         </button>
//       </div>
//       <div className="flex justify-center mt-10">
//         <div className="w-2/3 columns-3 gap-5 bg-secondary p-8 rounded-4xl">
//           <AnimatePresence initial={false}>
//             {list.map((item) => (
//               <motion.div
//                 key={item.id}
//                 initial={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
//                 animate={{ opacity: 1, x: 0, height: "auto", marginBottom: 20 }}
//                 exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
//                 transition={{ duration: 0.25, ease: "easeInOut" }}
//                 // style={{ overflow: "hidden" }}
//                 className="w-full lg:w-[250px] break-inside-avoid"
//               >
//                 <div
//                   className={cn([
//                     "flex items-center justify-between",
//                     "px-4 py-2 rounded-xl",
//                     "bg-primary text-txt-primary",
//                   ])}
//                 >
//                   <span>{item.content}</span>
//                   <button onClick={() => removeItem(item.id)}>X</button>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       </div>
//     </>
//   );
// }
"use client";

import React, { useState } from "react";
import cn from "@/lib/cn";
import { AnimatePresence, motion } from "motion/react";

const defaultList = [
  { id: 0, content: 10 },
  { id: 1, content: 20 },
  { id: 2, content: 30 },
  { id: 3, content: 40 },
  { id: 4, content: 50 },
  { id: 5, content: 60 },
  { id: 6, content: 70 },
  { id: 7, content: 80 },
  { id: 8, content: 90 },
  { id: 9, content: 100 },
];

export default function AdminPage() {
  const [list, setList] = useState(defaultList);

  const removeItem = (itemId: number) => {
    setList((p) => [...p.filter((item) => item.id !== itemId)]);
  };

  const addNewItem = () => {
    setList((p) => [
      ...p,
      { id: p[p.length - 1].id + 1, content: p[p.length - 1].content + 10 },
    ]);
  };

  return (
    <>
      <div className="flex items-center justify-center mt-10">
        <button onClick={addNewItem} className="text-txt-primary">
          Add new item
        </button>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-2/3 columns-3 gap-3 bg-secondary p-8 rounded-4xl">
          <AnimatePresence mode="popLayout">
            {list.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
                transition={{
                  layout: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
                  filter: { duration: 0.2 },
                }}
                className="w-full lg:w-[250px] break-inside-avoid mb-3"
              >
                <div
                  className={cn([
                    "flex items-center justify-between",
                    "px-4 py-2 rounded-xl",
                    "bg-primary text-txt-primary",
                  ])}
                  style={{ height: `${item.content + 20}px` }}
                >
                  <span>{item.content}</span>
                  <button onClick={() => removeItem(item.id)}>X</button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
