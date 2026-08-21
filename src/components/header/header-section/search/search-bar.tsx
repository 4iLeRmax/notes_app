"use client";

import { Search, X } from "lucide-react";
import FormInput from "../../../UI/formElements/form-input";
import { motion } from "motion/react";
import React, { useEffect, useRef } from "react";

interface SearchBarProps {
  searchValue: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({
  searchValue,
  handleSearch,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className="fixed z-20 top-16 sm:top-[calc(20px+41px+10px)] right-2 sm:right-[77px] w-[calc(100%-16px)] sm:w-100 "
      >
        <div className="bg-secondary shadow-outside rounded-4xl p-4">
          <div className="flex items-center gap-2 text-txt-primary">
            <div className="p-2 rounded-full shadow-outside-small bg-primary">
              <Search size={25} />
            </div>

            <FormInput
              type="text"
              name="search"
              customRef={inputRef}
              value={searchValue}
              onChange={handleSearch}
              placeholder="Search..."
              className=""
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}
