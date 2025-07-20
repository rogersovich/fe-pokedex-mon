"use client";

import { useSearchStore } from "@/stores/search-store";
import { IconX } from "@tabler/icons-react";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

interface SearchProps {
  q: string;
  onTriggerRefetch: (q: string) => void;
}

export default function InputSearchPokemon({
  q: initialQ = "",
  onTriggerRefetch,
}: SearchProps) {
  const debounceTime = 500;

  const searchStore = useSearchStore();
  const [searchTerm, setSearchTerm] = useState(initialQ);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialQ);
  const [isInitialMounted, setIsInitialMounted] = useState(true);

  // --- Effect 1: Debounce the search term ---
  useEffect(() => {
    // Set a timeout to update the debounced search term
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, debounceTime);

    // Cleanup function: Clear the timeout if searchTerm changes or component unmounts
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, debounceTime]);

  // --- Effect 2: Trigger search when debounced term changes ---
  useEffect(() => {
    if (isInitialMounted) {
      setIsInitialMounted(false);
    } else {
      onTriggerRefetch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    searchStore.setOffset(0);
  };

  const handleClear = () => {
    setSearchTerm("");
    searchStore.setOffset(0);
  };

  return (
    <>
      <div className="w-full relative">
        <input
          placeholder="Search pokemon..."
          type="text"
          className={clsx("w-full", "outline outline-zinc-200 focus:outline-blue-400 py-2 px-3 rounded-md", searchTerm && "pr-8")}
          value={searchTerm}
          onChange={handleChange}
        />
        {searchTerm && (
          <IconX
            className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer hover:text-red-500"
            onClick={handleClear}
          />
        )}
      </div>
    </>
  );
}
