"use client";

import type { BaseResponse } from "@/types/base";
import type { BasePokemonList } from "@/types/pokemon";

import React, { useState, useCallback, useRef, useEffect } from "react";

// Import komponen UI lainnya
import InputSearchPokemon from "@/app/pokemon/components/InputSearchPokemon";
import PokemonGroupCard from "@/app/pokemon/components/PokemonGroupCard";
import SelectTypePokemon from "@/app/pokemon/components/SelectTypePokemon";

// Import custom hooks
import { usePokemonData } from "@/hooks/usePokemonData";
import { useCombinedPokemonData } from "@/hooks/useCombinedPokemonData";
import { useScrollDetection } from "@/hooks/useScrollDetection";

import { useSearchStore } from "@/stores/search-store";

interface ClientPageWrapperProps {
  pokemonDataSSR: BaseResponse<BasePokemonList> | null;
  pokemonError: string | null;
}

export default function ClientPageWrapper({
  pokemonDataSSR,
  pokemonError,
}: ClientPageWrapperProps) {
  const searchStore = useSearchStore();
  const [limitParam, setLimitParam] = useState(12);
  const [offsetParam, setOffsetParam] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isQueryEnabled, setIsQueryEnabled] = useState(false); // Enable query after first interaction

  // Ref untuk mencegah pemanggilan load more berulang
  const isLoadInProgressRef = useRef(false);

  // --- Menggunakan usePokemonData hook ---
  const {
    data: pokemonDataQuery,
    isLoading,
    isError,
    error,
    isFetching,
  } = usePokemonData({
    limit: limitParam,
    offset: offsetParam,
    searchQuery: searchQuery,
    enabled: isQueryEnabled,
    initialData: pokemonDataSSR, // Gunakan initialData untuk SSR
  });

  // --- Menggunakan useCombinedPokemonData hook ---
  const { fullCombinePokemonData, hasMoreData } = useCombinedPokemonData({
    pokemonDataSSR: pokemonDataSSR,
    pokemonDataQuery: pokemonDataQuery,
    isFetching: isFetching,
    isQueryEnabled: isQueryEnabled,
    isSearching,
  });

  // --- NEW: useEffect untuk mereset isLoadInProgressRef.current ---
  useEffect(() => {
    // Ketika isFetching berubah dari true ke false (fetch selesai), reset flag
    if (!isFetching && isLoadInProgressRef.current) {
      isLoadInProgressRef.current = false;

      // NEW: Reset isSearching
      if (isSearching) {
        setIsSearching(false);
      }
    } else if (!isFetching) {
      // NEW: Reset isSearching
      if (isSearching) {
        setIsSearching(false);
      }
    }
  }, [isFetching]); // Bergantung pada isFetching

  // --- Error Handling ---
  const combinedPokemonError = isError ? error.message : pokemonError;

  // --- Search Trigger ---
  const handleTriggerSearch = useCallback(
    (q: string) => {
      if (!isQueryEnabled) setIsQueryEnabled(true);
      setIsSearching(true);
      setSearchQuery(q);
      setOffsetParam(0); // Reset offset for new search
      searchStore.offset = 0;
      isLoadInProgressRef.current = false; // Reset flag for new pagination/search
    },
    [isQueryEnabled, searchStore, isSearching]
  );

  // --- Load More Function (dipanggil oleh scroll dan tombol manual) ---
  const handleLoadMore = useCallback(() => {
    if (
      !hasMoreData ||
      isFetching ||
      isLoadInProgressRef.current ||
      isLoading
    ) {
      return;
    }

    if (!isQueryEnabled) setIsQueryEnabled(true);

    const nextOffset = offsetParam + limitParam;

    isLoadInProgressRef.current = true; // Set flag immediately
    setOffsetParam(nextOffset); // Ini akan memicu useQuery
    searchStore.offset = nextOffset; // Update store
  }, [
    offsetParam,
    limitParam,
    hasMoreData,
    isFetching,
    isQueryEnabled,
    isLoading,
    searchStore,
  ]);

  // --- Menggunakan useScrollDetection hook ---
  useScrollDetection({
    onScrollToBottom: handleLoadMore,
    scrollThreshold: 100, // Opsional
  });

  return (
    <>
      <div className="base-card">
        <InputSearchPokemon
          q={searchQuery}
          onTriggerRefetch={handleTriggerSearch}
        />
      </div>
      <div className="base-card flex items-center justify-between gap-4">
        <SelectTypePokemon />
      </div>
      <div className="grid grid-cols-12 gap-4">
        <PokemonGroupCard
          pokemonError={combinedPokemonError}
          pokemonList={fullCombinePokemonData}
          isLoading={isLoading || isFetching}
        />
        <div className="col-span-12 text-center py-4">
          {isFetching && (
            <p className="text-gray-600">Memuat lebih banyak Pokémon...</p>
          )}
          {!hasMoreData && !isFetching && (
            <p className="text-gray-500">
              Tidak ada lagi Pokémon untuk dimuat.
            </p>
          )}
          {hasMoreData &&
            !isFetching && ( // Hanya tampilkan tombol jika masih ada data & tidak sedang loading
              <button
                type="button"
                className="bg-blue-500 px-3 py-1.5 text-white rounded cursor-pointer disabled:opacity-50"
                onClick={handleLoadMore}
                disabled={isFetching || !hasMoreData}
              >
                Muat Lebih Banyak
              </button>
            )}
          {fullCombinePokemonData?.data?.items.length === 0 &&
            !isLoading &&
            !isFetching &&
            !combinedPokemonError && (
              <p className="text-gray-500">Tidak ada Pokémon ditemukan.</p>
            )}
        </div>
      </div>
    </>
  );
}
