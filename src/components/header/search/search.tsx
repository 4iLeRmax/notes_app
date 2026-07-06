"use client";

import React, { useEffect, useRef, useState } from "react";
import SearchButton from "./search-button";
import SearchBar from "./search-bar";
import { AnimatePresence } from "motion/react";
import { useSearchQuery } from "@/hooks/useSearchQuey";

function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { searchValue, handleSearch, clearSearch } = useSearchQuery();

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen && searchValue.length === 0) setIsOpen(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen, searchValue]);

  useEffect(() => {
    if (searchValue !== "") setIsOpen(true);
  }, []);

  const toggleOpen = () => {
    if (isOpen) clearSearch();
    setIsOpen((p) => !p);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.relatedTarget as Node) &&
      searchValue.length === 0
    ) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div ref={containerRef} tabIndex={0} onBlur={handleBlur}>
        <SearchButton isActive={isOpen} toggleOpen={toggleOpen} />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <SearchBar searchValue={searchValue} handleSearch={handleSearch} />
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}

export default React.memo(Search);
