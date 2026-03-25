"use client";

import cn from "@/lib/cn";
import { Search, X } from "lucide-react";
import FormInput from "../../UI/formElements/form-input";
import { useRef, useState } from "react";

interface SearchBarProps {
  searchValue: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({
  searchValue,
  handleSearch,
}: SearchBarProps) {
  return (
    <>
      <div className="fixed z-20 top-[calc(20px+41px+10px)] right-5 xs:right-[134px] w-100 ">
        <div className="bg-primary shadow-outside rounded-4xl p-4">
          <div className="flex items-center gap-2 text-txt-primary">
            <div className="p-2 rounded-full shadow-outside_small">
              <Search size={25} />
            </div>

            <FormInput
              type="text"
              name="search"
              value={searchValue}
              onChange={handleSearch}
              placeholder="Search..."
              className=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
