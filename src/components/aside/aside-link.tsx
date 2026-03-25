// "use client";

// import cn from "@/lib/cn";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React from "react";

// interface AsideLinkProps {
//   link: string;
//   label: string;
//   menuIsOpen: boolean;
//   icon?: React.ReactNode;
// }

// export default function AsideLink({
//   link,
//   label,
//   menuIsOpen,
//   icon,
// }: AsideLinkProps) {
//   const path = usePathname();

//   return (
//     <>
//       <Link
//         href={link}
//         className={cn(
//           "w-full flex items-center gap-2 p-2 rounded-2xl shadow-outside_small mt-4",
//           {
//             "shadow-outside_small": path !== link,
//             "shadow-inside": path === link,
//           },
//         )}
//       >
//         {icon ? icon : null}
//         {menuIsOpen ? <span>{label}</span> : null}
//       </Link>
//     </>
//   );
// }
"use client";

import cn from "@/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface AsideLinkProps {
  link: string;
  label: string;
  menuIsOpen: boolean;
  icon?: React.ReactNode;
}

export default function AsideLink({
  link,
  label,
  menuIsOpen,
  icon,
}: AsideLinkProps) {
  const path = usePathname();

  return (
    <>
      <Link
        href={link}
        className={cn(
          "w-full flex items-center gap-2 p-2  shadow-outside_small rounded-3xl",
          {
            "shadow-outside_small": path !== link,
            "shadow-inside": path === link,
            "w-[41px] ": !menuIsOpen,
            "w-full ": menuIsOpen,
          },
        )}
      >
        {icon ? icon : null}
        {menuIsOpen ? <span>{label}</span> : null}
      </Link>
    </>
  );
}
