"use client";

import type { BaseResponse } from "@/types/base";
import type { PokemonList } from "@/types/pokemon";

import React, { useState } from "react";
import InputSearchPokemon from "@/components/InputSearchPokemon";
import PokemonGroupCard from "@/components/PokemonGroupCard";
import PokemonPageControl from "@/components/PokemonPageControl";
import { getPokemonList } from "@/lib/api/pokemon";
import { useQuery } from "@tanstack/react-query";
import SelectTypePokemon from "@/components/SelectTypePokemon";

interface ClientPageWrapperProps {
  pokemonResponse: BaseResponse<PokemonList[]> | null;
  pokemonError: string | null;
}

const fetchPokemonAdditionalData = async (
  limit: number,
  offset: number,
  q: string
): Promise<BaseResponse<PokemonList[]> | null> => {
  const data = await getPokemonList({ offset, limit, q });

  return data;
};

export default function ClientPageWrapper({
  pokemonResponse,
  pokemonError,
}: ClientPageWrapperProps) {
  const [limitParam, setLimitParam] = useState(9);
  const [offsetParam, setOffsetParam] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  const [isInitialMounted, setIsInitialMounted] = useState(true);

  const {
    data: additionalPokemonData,
    isLoading,
    isError,
    error,
  } = useQuery<BaseResponse<PokemonList[]> | null, Error>({
    queryKey: ["pokemonList", limitParam, offsetParam, searchQuery],
    queryFn: () =>
      fetchPokemonAdditionalData(limitParam, offsetParam, searchQuery),
    enabled: isQueryEnabled,
  });

  const combinedPokemonData = isInitialMounted
    ? pokemonResponse
    : additionalPokemonData;

  const combinedPokemonError = isError ? error.message : pokemonError;

  const handleTriggerPagination = (limit: number, offset: number) => {
    if (!isQueryEnabled) {
      setIsQueryEnabled(true);
    }

    if (isInitialMounted) {
      setIsInitialMounted(false);
    }

    setLimitParam(limit);
    setOffsetParam(offset);
  };

  const handleTriggerSearch = (q: string) => {
    if (!isQueryEnabled) {
      setIsQueryEnabled(true);
    }

    if (isInitialMounted) {
      setIsInitialMounted(false);
    }

    setSearchQuery(q);
    setOffsetParam(0);
  };

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
          count={combinedPokemonData?.count || 0}
          limit={limitParam}
          offset={offsetParam}
          onTriggerRefetch={handleTriggerPagination}
        />
        <SelectTypePokemon />
      </div>
      <div className="grid grid-cols-12 gap-4">
        <PokemonGroupCard
          pokemonError={combinedPokemonError}
          pokemonList={combinedPokemonData}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
