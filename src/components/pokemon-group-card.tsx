import React from "react";
import Image from "next/image";
import ChipType from "@/components/chip-type";

import type { BaseResponse } from "@/types/base";
import type { PokemonList } from "@/types/pokemon";

export default function PokemonGroupCard({
  pokemonError,
  pokemonList,
}: {
  pokemonError: string | null;
  pokemonList: BaseResponse<PokemonList[]> | null;
}) {
  return (
    <>
      {pokemonError ? (
        <p className="text-center text-red-500">Error: {pokemonError}</p>
      ) : pokemonList?.results.length === 0 ? (
        <div className="col-span-12">
          <div className="base-card">
            <div className="text-center">No results found</div>
          </div>
        </div>
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
  );
}
