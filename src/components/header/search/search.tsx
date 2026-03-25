"use client";

import React, { useEffect, useRef, useState } from "react";
import SearchButton from "./search-button";
import SearchBar from "./search-bar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

const SEARCH_QUERY_LIMIT = 100;
const DEBOUNCE_VALUE = 500;

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue] = useDebounce(searchValue, DEBOUNCE_VALUE);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = searchParams.get("q") || "";
    if (q) {
      setSearchValue(q);
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (debouncedValue.length > 0) {
      params.set("q", debouncedValue);
    } else {
      params.delete("q");
    }
    router.replace(`?${params.toString()}`);
  }, [debouncedValue]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, SEARCH_QUERY_LIMIT);
    setSearchValue(value);
  };

  const toggleOpen = () => setIsOpen((p) => !p);

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.relatedTarget as Node)
    ) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div ref={containerRef} tabIndex={1} onBlur={handleBlur}>
        <SearchButton isActive={isOpen} toggleOpen={toggleOpen} />
        {isOpen || searchValue.length > 0 ? (
          <SearchBar searchValue={searchValue} handleSearch={handleSearch} />
        ) : null}
      </div>
    </>
  );
}
