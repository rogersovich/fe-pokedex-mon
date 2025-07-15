import React from "react";

import type { BaseResponse } from "@/types/base";
import type { BasePokemonList } from "@/types/pokemon";
import ErrorCardPokemon from "@/app/pokemon/components/ErrorCardPokemon";
import NotFoundCardPokemon from "@/app/pokemon/components/NotFoundCardPokemon";
import PokemonCard from "./PokemonCard";

export default function PokemonGroupCard({
  pokemonError,
  pokemonList,
  isLoading,
}: {
  pokemonError: string | null;
  pokemonList: BaseResponse<BasePokemonList> | null | undefined;
  isLoading: boolean;
}) {
  return (
    <>
      {pokemonError ? (
        <ErrorCardPokemon />
      ) : pokemonList?.data.items.length === 0 ? (
        <NotFoundCardPokemon />
      ) : (
        <>
          {pokemonList?.data?.items.map((pokemon, i_pokemon) => (
            <div key={i_pokemon} className="col-span-4">
              <PokemonCard pokemon={pokemon} />
            </div>
          ))}
        </>
      )}
    </>
  );
}
