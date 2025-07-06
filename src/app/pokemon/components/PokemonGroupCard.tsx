import React from "react";
import Image from "next/image";
import ChipType from "@/components/ChipType";

import type { BaseResponse } from "@/types/base";
import type { PokemonList } from "@/types/pokemon";
import ShimmerCardPokemon from "@/app/pokemon/components/ShimmerCardPokemon";
import ErrorCardPokemon from "@/app/pokemon/components/ErrorCardPokemon";
import NotFoundCardPokemon from "@/app/pokemon/components/NotFoundCardPokemon";
import PokemonCard from "./PokemonCard";

export default function PokemonGroupCard({
  pokemonError,
  pokemonList,
  isLoading,
}: {
  pokemonError: string | null;
  pokemonList: BaseResponse<PokemonList[]> | null | undefined;
  isLoading: boolean;
}) {
  return (
    <>
      {pokemonError ? (
        <ErrorCardPokemon />
      ) : pokemonList?.results.length === 0 ? (
        <NotFoundCardPokemon />
      ) : (
        <>
          {pokemonList?.results.map((pokemon, i_pokemon) => (
            <div key={i_pokemon} className="col-span-4">
              <PokemonCard pokemon={pokemon} />
            </div>
          ))}
        </>
      )}
    </>
  );
}
