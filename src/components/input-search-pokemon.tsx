"use client";

import { useSearchStore } from "@/stores/search-store";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface SearchProps {
  offset: number;
  limit: number;
  q: string;
}

export default function InputSearchPokemon({
  offset,
  limit,
  q: initialQ = "",
}: SearchProps) {
  const searchStore = useSearchStore();

  const router = useRouter();
  const debounceTime = 500;

  const [searchTerm, setSearchTerm] = useState(initialQ);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialQ);

  // Ref untuk melacak apakah ini adalah render pertama (sudah ter-mount)
  const isMounted = useRef(false);

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
    if (!isMounted.current) {
      isMounted.current = true;
      if (initialQ !== "") {
        router.push(
          `?limit=${searchStore.base_limit}&offset=${searchStore.base_offset}&q=${initialQ}`
        );
      }
      return;
    }

    //todo: When not Initial Mounted
    if (debouncedSearchTerm !== "") {
      router.push(
        `?limit=${searchStore.base_limit}&offset=${searchStore.base_offset}&q=${debouncedSearchTerm}`
      );
    } else {
      router.push(
        `?limit=${searchStore.base_limit}&offset=${searchStore.base_offset}`
      );
    }
  }, [debouncedSearchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <input
        placeholder="Search pokemon..."
        type="text"
        className="w-full focus:outline-none"
        value={searchTerm}
        onChange={handleChange}
      />
    </>
  );
}
