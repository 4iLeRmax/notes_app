"use client";

import { getLabels } from "@/lib/actions/label";
import cn from "@/lib/cn";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Tag,
  Tags,
} from "lucide-react";
import Link from "next/link";
import { Activity, useState, memo } from "react";

interface MobileMenuLabelListProps {
  //   menuIsOpen: boolean;
}

function MobileMenuLabelList(
  {
    //   menuIsOpen,
  }: MobileMenuLabelListProps,
) {
  const [listIsOpen, setListIsOpen] = useState(false);
  const { data: labels } = useQuery({
    queryKey: ["labels"],
    queryFn: async () => await getLabels(),
    enabled: listIsOpen,
    staleTime: 5 * 60 * 1000,
  });

  if (!labels || labels.length < 1) return null;

  return (
    <>
      <button
        onClick={() => {
          setListIsOpen((p) => !p);
        }}
        className={cn(
          "flex items-center justify-between text-txt-primary p-4 rounded-3xl bg-primary",
          {
            "shadow-outside-small": !listIsOpen,
            "shadow-inside": listIsOpen,
          },
        )}
      >
        <div className="flex items-center gap-2">
          <Tags size={20} />
          <span>Labels</span>
        </div>
        {listIsOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </button>
      {/* <div className=" w-full h-[calc(100vh*0.9-553px)] bg-red-500/30"></div> */}
      {labels ? (
        <Activity mode={listIsOpen ? "visible" : "hidden"}>
          <div
            className={cn(
              //   "w-full flex flex-col items-start gap-4 max-h-[calc(208px)]",
              "w-full flex flex-col items-start gap-4 h-[calc(100vh*0.9-533px-16px)]", //must be 124
              "pl-4 pr-2 overflow-y-scroll snap-y snap-mandatory",
            )}
          >
            {labels.map((label) => (
              <Link
                href={`/labels/${label.id}`}
                key={label.id}
                className="flex items-center justify-between bg-primary rounded-3xl shadow-outside-small w-full p-2 text-txt-primary"
              >
                <div className="flex items-center gap-2 w-full">
                  <Tag size={20} />
                  <span className="w-full truncate">{label.name}</span>
                </div>
                <ExternalLink size={20} />
              </Link>
            ))}
          </div>
        </Activity>
      ) : null}
    </>
  );
}

export default memo(MobileMenuLabelList);
