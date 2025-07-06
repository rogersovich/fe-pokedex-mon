"use client";

import type { TBaseType } from "@/types/types";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import type { BaseResponse } from "@/types/base";
import { getPokemonTypeList } from "@/lib/api/pokemon-type";
import { useQuery } from "@tanstack/react-query";
const ReactSelect = dynamic(() => import("react-select"), {
  ssr: false,
});

interface PokemonTypeOption {
  label: string;
  value: string;
}

const fetchPokemonTypes = async (): Promise<BaseResponse<TBaseType[]>> => {
  const data = await getPokemonTypeList();

  return data;
};

const formatOptionLabel = (option: PokemonTypeOption) => {
  return (
    <div className="flex items-center gap-2">
      <span className="capitalize">{option.label}</span>
    </div>
  );
};

export default function SelectTypePokemon() {
  const {
    data: resPokemonTypes,
    isLoading,
    isError,
  } = useQuery<BaseResponse<TBaseType[]> | null, Error>({
    queryKey: ["pokemonTypes"],
    queryFn: () => fetchPokemonTypes(),
    enabled: true,
  });


  const pokemonTypes = resPokemonTypes?.results.map((type) => ({
    label: type.name,
    value: type.name,
  }));

  const [selectedType, setSelectedType] = useState<string>("");

  const handleChange = (selectedOption: any) => {
    if (selectedOption) {
      setSelectedType(selectedOption.value);
    }
  };

  return (
    <div className="w-[200px]">
      {!isError && pokemonTypes && (
        <ReactSelect
          options={pokemonTypes}
          onChange={(option) => handleChange(option as any)}
          formatOptionLabel={(option) => formatOptionLabel(option as PokemonTypeOption)}
          isLoading={isLoading}
          isClearable
          isSearchable
        />
      )}
    </div>
  );
}
