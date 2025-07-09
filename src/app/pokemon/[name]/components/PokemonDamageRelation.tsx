"use client";

import { usePokemonWeaknessTypeData } from "@/hooks/usePokemonWeaknessTypeData";
import type { PokemonType } from "@/types/pokemon";
import React from "react";
import ChipType from "@/components/ChipType";

interface MyProps {
  pokemon_id: number;
  pokemon_types: PokemonType[];
}

export default function PokemonDamageRelation({
  pokemon_id,
  pokemon_types,
}: MyProps) {
  // --- Menggunakan usePokemonData hook ---
  const {
    data: pokemonWeakness,
    isLoading,
    isError,
    error,
  } = usePokemonWeaknessTypeData({
    pokemon_types: pokemon_types,
    pokemon_id: pokemon_id,
    enabled: true,
  });

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error?.message}</div>
      ) : pokemonWeakness ? (
        <div className="my-4">
          <div className="text-3xl font-extrabold mb-4">Weakness</div>
          <div className="flex flex-wrap items-center gap-2">
            {pokemonWeakness.weakness.map((dmg, i_dmg) => (
              <div
                key={i_dmg}
                className="flex flex-col justify-center items-center gap-2"
              >
                <div>{dmg.weakness_point}x</div>
                <ChipType type={dmg.name}>{dmg.name}</ChipType>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
