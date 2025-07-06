import React from "react";
import Image from "next/image";
import ChipType from "@/components/ChipType";

import type { BaseResponse } from "@/types/base";
import type { PokemonList } from "@/types/pokemon";
import ShimmerCardPokemon from "@/app/pokemon/components/ShimmerCardPokemon";
import ErrorCardPokemon from "@/app/pokemon/components/ErrorCardPokemon";
import NotFoundCardPokemon from "@/app/pokemon/components/NotFoundCardPokemon";

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
      {isLoading ? (
        <ShimmerCardPokemon />
      ) : (
        <>
          {pokemonError ? (
            <ErrorCardPokemon />
          ) : pokemonList?.results.length === 0 ? (
            <NotFoundCardPokemon />
          ) : (
            <>
              {pokemonList?.results.map((pokemon, i_pokemon) => (
                <div key={i_pokemon} className="col-span-4">
                  <div className="base-card !py-8 flex flex-col justify-center items-center gap-2 cursor-pointer">
                    <Image
                      src={pokemon.thumbnail}
                      alt={pokemon.name}
                      width={90}
                      height={90}
                      loading="eager"
                      className="transition-transform duration-300 ease-in-out hover:scale-125"
                    />
                    <div className="font-bold text-xl capitalize">
                      {pokemon.name}
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      {pokemon.types.map((type, i_type) => (
                        <ChipType key={i_type} type={type.type.name}>
                          {type.type.name}
                        </ChipType>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
}
