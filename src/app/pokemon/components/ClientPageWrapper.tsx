'use client';

import type { BaseResponse } from "@/types/base";
import type { PokemonList } from "@/types/pokemon";

import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import InputSearchPokemon from "@/app/pokemon/components/InputSearchPokemon";
import PokemonGroupCard from "@/app/pokemon/components/PokemonGroupCard";
import PokemonPageControl from "@/app/pokemon/components/PokemonPageControl";
import { getPokemonList } from "@/lib/api/pokemon";
import { useQuery } from "@tanstack/react-query";
import SelectTypePokemon from "@/app/pokemon/components/SelectTypePokemon";
import { useSearchStore } from "@/stores/search-store";

interface ClientPageWrapperProps {
  pokemonDataSSR: BaseResponse<PokemonList[]> | null;
  pokemonError: string | null;
}

const fetchPokemonAdditionalData = async (
  limit: number,
  offset: number,
  q: string
): Promise<BaseResponse<PokemonList[]> | null> => {
  // Add a slight delay to simulate network latency and better observe loading states
  await new Promise(resolve => setTimeout(resolve, 30));
  const data = await getPokemonList({ offset, limit, q });
  return data;
};

export default function ClientPageWrapper({
  pokemonDataSSR,
  pokemonError,
}: ClientPageWrapperProps) {
  const searchStore = useSearchStore();
  const [limitParam, setLimitParam] = useState(15);
  const [offsetParam, setOffsetParam] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  // `isQueryEnabled` can often be removed if you handle initial data with `initialData`
  // and `enabled` is implicitly true when `queryKey` is ready.
  // For simplicity, let's keep it if your app logic truly needs it.
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);

  // --- Infinite Scroll States & Refs ---
  // `hasMoreData` should ideally be derived from the API response
  const [hasMoreData, setHasMoreData] = useState(true);
  const isLoadInProgressRef = useRef(false); // Prevents multiple rapid load calls
  const isInitialLoadCompleteRef = useRef(false); // To manage initial SSR data more cleanly
  // --- End Infinite Scroll States ---

  // Use `initialData` for SSR, but only if `pokemonDataSSR` is not null
  const {
    data: pokemonDataQuery,
    isLoading, // Initial loading state (first fetch)
    isError,
    error,
    isFetching, // More granular loading state (any fetch, including background revalidations)
  } = useQuery<BaseResponse<PokemonList[]> | null, Error>({
    queryKey: ["pokemonList", limitParam, offsetParam, searchQuery],
    queryFn: () =>
      fetchPokemonAdditionalData(limitParam, offsetParam, searchQuery),
    enabled: isQueryEnabled,
    // Add initialData here to hydrate from SSR
    initialData: pokemonDataSSR || undefined,
    // This will prevent the query from running on mount if SSR data is available
    // unless a dependency (like offsetParam) changes later.
    // If you want it to refetch on mount *even with SSR data*, remove `initialData`
    // and handle the initial fetch in useEffect or a separate query.
  });

  // State to hold the combined data (SSR + fetched via query)
  const [fullCombinePokemonData, setFullCombinePokemonData] = useState<BaseResponse<PokemonList[]> | null>(
    pokemonDataSSR
  );

  // --- Effect to manage combined data and hasMoreData ---
  useEffect(() => {
    // If SSR data is present and this is the very first render, set it up.
    if (!isInitialLoadCompleteRef.current && pokemonDataSSR) {
      setFullCombinePokemonData(pokemonDataSSR);
      setHasMoreData(!!pokemonDataSSR.next); // Assume 'next' prop for more data
      isInitialLoadCompleteRef.current = true; // Mark initial load as complete
      // No need to set isQueryEnabled to true here, useQuery will be enabled by offset/limit/search changes
      return; // Exit to avoid re-processing SSR data as if it were a new query fetch
    }

    // Only proceed if data from useQuery is available and it's not the very initial SSR load
    if (pokemonDataQuery && !isFetching && isQueryEnabled) { // Check `isFetching` to process only after fetch completes
      setFullCombinePokemonData((prevData) => {
        if (!prevData) return pokemonDataQuery; // If no previous data, just use the new one

        // Combine logic:
        const newResults = pokemonDataQuery.results.filter(
          (newPokemon) =>
            !prevData.results.some((oldPokemon) => oldPokemon.name === newPokemon.name)
        );

        return {
          ...prevData,
          results: [...prevData.results, ...newResults],
          count: pokemonDataQuery.count // Always take the latest count from the API
        };
      });

      // Update hasMoreData based on the latest query result
      setHasMoreData(!!pokemonDataQuery.next); // Or: fullCombinePokemonData.results.length < pokemonDataQuery.count

      // Reset the load in progress flag after data is successfully processed
      isLoadInProgressRef.current = false;
    }
  }, [pokemonDataQuery, pokemonDataSSR, isFetching, isQueryEnabled]); // `isFetching` and `isQueryEnabled` added to dependencies

  // --- Error Handling ---
  const combinedPokemonError = isError ? error.message : pokemonError;

  // --- Pagination Trigger (for manual page changes) ---
  const handleTriggerPagination = useCallback((limit: number, offset: number) => {
    if (!isQueryEnabled) setIsQueryEnabled(true);
    setLimitParam(limit);
    setOffsetParam(offset);
    searchStore.offset = offset; // Update store
    setHasMoreData(true); // Assume there might be more data with new pagination
  }, [isQueryEnabled, searchStore]);

  // --- Search Trigger ---
  const handleTriggerSearch = useCallback((q: string) => {
    if (!isQueryEnabled) setIsQueryEnabled(true);
    setSearchQuery(q);
    setOffsetParam(0); // Reset offset for new search
    searchStore.offset = 0; // Update store
    setHasMoreData(true); // Assume there might be more data for new search
  }, [isQueryEnabled, searchStore]);

  // --- Load More Function (called by scroll and manual button) ---
  // Ensure this function does NOT cause a state update that triggers useQuery directly
  // Instead, it updates the offset which is a queryKey dependency.
  const handleLoadMore = useCallback(() => {
    if (!hasMoreData || isFetching || isLoadInProgressRef.current) {
        console.log("Load more prevented: ", { hasMoreData, isFetching, isLoadInProgressRef: isLoadInProgressRef.current });
        return;
    }

    if (!isQueryEnabled) setIsQueryEnabled(true);

    const nextOffset = offsetParam + limitParam;
    console.log("Triggering load more for offset:", nextOffset);

    isLoadInProgressRef.current = true; // Set flag immediately
    setOffsetParam(nextOffset); // This will trigger useQuery
    searchStore.offset = nextOffset; // Update store
  }, [offsetParam, limitParam, hasMoreData, isFetching, isQueryEnabled, searchStore]);


  // --- Scroll Handler ---
  const handleScroll = useCallback(() => {
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const currentScrollY = window.scrollY;

    const scrollThreshold = 100; // Pixels from bottom to trigger

    const isNearBottom = currentScrollY + viewportHeight >= documentHeight - scrollThreshold;

    if (isNearBottom) {
      console.log('Detected near bottom. Attempting to load more.');
      handleLoadMore(); // Call handleLoadMore which has its own checks
    }
  }, [handleLoadMore]); // handleLoadMore is a dependency

  // --- Attach/Detach Scroll Listener ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]); // `handleScroll` is stable due to useCallback


  return (
    <>
      <div className="base-card">
        <InputSearchPokemon
          q={searchQuery}
          onTriggerRefetch={handleTriggerSearch}
        />
      </div>
      <div className="base-card flex items-center justify-between gap-4">
        <PokemonPageControl
          count={fullCombinePokemonData?.count || 0}
          limit={limitParam}
          offset={offsetParam}
          onTriggerRefetch={handleTriggerPagination}
        />
        <SelectTypePokemon />
      </div>
      <div className="grid grid-cols-12 gap-4">
        <PokemonGroupCard
          pokemonError={combinedPokemonError}
          pokemonList={fullCombinePokemonData}
          isLoading={isLoading || isFetching} // Use isFetching for any background loading
        />
        <div className="col-span-12 text-center py-4">
          {isFetching && <p className="text-gray-600">Memuat lebih banyak Pokémon...</p>}
          {!hasMoreData && !isFetching && (
            <p className="text-gray-500">Tidak ada lagi Pokémon untuk dimuat.</p>
          )}
          {/* Optional: Manual Load More button, useful for debugging or as a fallback */}
          {hasMoreData && !isFetching && (
            <button
              type="button"
              className="bg-blue-500 px-3 py-1.5 text-white rounded cursor-pointer disabled:opacity-50"
              onClick={handleLoadMore}
              disabled={isFetching || !hasMoreData}
            >
              Muat Lebih Banyak
            </button>
          )}
          {fullCombinePokemonData?.results.length === 0 && !isLoading && !isFetching && !combinedPokemonError && (
              <p className="text-gray-500">Tidak ada Pokémon ditemukan.</p>
          )}
        </div>
      </div>
    </>
  );
}