"use client";

import PokemonGroupCard from "@/components/PokemonGroupCard";
import PokemonPageControl from "@/components/PokemonPageControl";
import { getPokemonList } from "@/lib/api/pokemon";
import type { BaseResponse } from "@/types/base";
import type { PokemonList } from "@/types/pokemon";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

interface ClientPageWrapperProps {
  pokemonResponse: BaseResponse<PokemonList[]> | null;
  pokemonError: string | null;
}

const fetchPokemonAdditionalData = async (
  limit: number,
  offset: number
): Promise<BaseResponse<PokemonList[]> | null> => {
  const data = await getPokemonList({ offset, limit });

  return data;
};

export default function ClientPageWrapper({
  pokemonResponse,
  pokemonError,
}: ClientPageWrapperProps) {
  const [limitParam, setLimitParam] = useState(9);
  const [offsetParam, setOffsetParam] = useState(0);
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);

  const {
    data: additionalPokemonData,
    isLoading,
    isError,
    error,
  } = useQuery<BaseResponse<PokemonList[]> | null, Error>({
    queryKey: ["pokemonList", limitParam, offsetParam], // Key unik untuk query ini
    queryFn: () => fetchPokemonAdditionalData(limitParam, offsetParam), // Fungsi yang melakukan fetch
    enabled: isQueryEnabled,
  });

  // Gabungkan data SSR dengan data yang di-fetch klien
  const combinedPokemonData =
    (typeof additionalPokemonData == "undefined" && offsetParam == 0 )
      ? pokemonResponse
      : additionalPokemonData;

  const combinedPokemonError = isError ? error.message : pokemonError;

  const handleTriggerRefetch = (limit: number, offset: number) => {
    if(!isQueryEnabled){
      setIsQueryEnabled(true);
    }

    setLimitParam(limit);
    setOffsetParam(offset);
  };

  return (
    <>
      <div className="base-card flex items-center justify-between gap-4">
        <PokemonPageControl
          count={pokemonResponse?.count || 0}
          limit={limitParam}
          offset={offsetParam}
          nextUrl={pokemonResponse?.next}
          previousUrl={pokemonResponse?.previous}
          onTriggerRefetch={handleTriggerRefetch}
        />
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
