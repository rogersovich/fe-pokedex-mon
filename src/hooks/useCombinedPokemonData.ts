// hooks/useCombinedPokemonData.ts
import { useState, useEffect, useRef } from 'react';
import type { BaseResponse } from "@/types/base";
import type { PokemonList } from "@/types/pokemon";

interface UseCombinedPokemonDataProps {
  pokemonDataSSR: BaseResponse<PokemonList[]> | null;
  pokemonDataQuery: BaseResponse<PokemonList[]> | null | undefined;
  isFetching: boolean; // Dari useQuery
  isQueryEnabled: boolean; // Dari parent component
  isSearching: boolean
}

export const useCombinedPokemonData = ({
  pokemonDataSSR,
  pokemonDataQuery,
  isFetching,
  isQueryEnabled,
  isSearching,
}: UseCombinedPokemonDataProps) => {
  const [fullCombinePokemonData, setFullCombinePokemonData] = useState<BaseResponse<PokemonList[]> | null>(
    pokemonDataSSR
  );
  const [hasMoreData, setHasMoreData] = useState(true);
  const isInitialLoadCompleteRef = useRef(false);

  useEffect(() => {
    // Initial load with SSR data
    if (!isInitialLoadCompleteRef.current && pokemonDataSSR) {
      setFullCombinePokemonData(pokemonDataSSR);
      setHasMoreData(!!pokemonDataSSR.next);
      isInitialLoadCompleteRef.current = true;
      return;
    }

    // Process data from useQuery after fetch completes and if query is enabled
    if (pokemonDataQuery && !isFetching && isQueryEnabled) {
      setFullCombinePokemonData((prevData) => {
        // --- NEW: Handle Search Scenario ---
        if (isSearching) {
          return pokemonDataQuery;
        }

        if (!prevData || prevData.results.length === 0) return pokemonDataQuery;

        // Filter out duplicates (assuming 'name' is unique identifier)
        const newResults = pokemonDataQuery.results.filter(
          (newPokemon) =>
            !prevData.results.some((oldPokemon) => oldPokemon.name === newPokemon.name)
        );

        return {
          ...prevData,
          results: [...prevData.results, ...newResults],
          count: pokemonDataQuery.count // Always take the latest total count from API
        };
      });

      // Update hasMoreData based on the latest query result
      setHasMoreData(!!pokemonDataQuery.next);
    }
  }, [pokemonDataQuery, pokemonDataSSR, isFetching, isQueryEnabled]);

  return { fullCombinePokemonData, hasMoreData, isInitialLoadCompleteRef, setHasMoreData, setFullCombinePokemonData };
};