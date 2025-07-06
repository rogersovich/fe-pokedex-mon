"use client";

import { useSearchStore } from "@/stores/search-store";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface SearchProps {
  q: string;
}

export default function InputSearchPokemon({
  q: initialQ = "",
}: SearchProps) {
  const searchStore = useSearchStore();

  const router = useRouter();
  const debounceTime = 500;

  const [searchTerm, setSearchTerm] = useState(initialQ);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialQ);

  // Ref untuk melacak apakah ini adalah render pertama (sudah ter-mount)
  const isMounted = useRef(false);

  const generateURL = (limit: number, offset: number, q: string) => {
    if (q === "") {
      return `?limit=${limit}&offset=${offset}`;
    }
    return `?limit=${limit}&offset=${offset}&q=${q}`;
  };

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
          generateURL(searchStore.base_limit, searchStore.base_offset, initialQ)
        );
      }
      return;
    }

    //todo: When not Initial Mounted
    if (debouncedSearchTerm !== "") {
      router.push(
        generateURL(searchStore.base_limit, searchStore.base_offset, debouncedSearchTerm)
      );
    } else {
      router.push(
        generateURL(searchStore.base_limit, searchStore.base_offset, "")
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
