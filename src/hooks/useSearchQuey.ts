import { DEBOUNCE_VALUE, SEARCH_QUERY_LIMIT } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export function useSearchQuery() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    () => searchParams.get("q") ?? "",
  );
  const [debouncedValue] = useDebounce(searchValue, DEBOUNCE_VALUE);

  useEffect(() => {
    const currentQ = searchParams.get("q") ?? "";

    if (debouncedValue === currentQ) return;

    const params = new URLSearchParams(searchParams.toString());

    if (debouncedValue.length > 0) {
      params.set("q", debouncedValue);
    } else {
      params.delete("q");
    }

    router.replace(`?${params.toString()}`);
  }, [debouncedValue]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.slice(0, SEARCH_QUERY_LIMIT));
  };

  const clearSearch = () => setSearchValue("");

  return {
    searchValue,
    handleSearch,
    clearSearch,
  };
}
