"use client";

import React from "react";
import ChipType from "@/components/ChipType";
import CustomImage from "@/components/CustomImage";
import { useRouter } from "next/navigation";
import { formatPokemonName } from "@/lib/string-formatter";
import type { PokemonList } from "@/types/pokemon";

export default function PokemonCard({ pokemon }: { pokemon: PokemonList }) {
  const router = useRouter();
  const formattedName = formatPokemonName(pokemon.name);
  const onClickPokemon = (pokemon_name: string) => {
    router.push(`/pokemon/${pokemon_name}`);
  };
  return (
    <div
      className="base-card !py-8 flex flex-col justify-center items-center gap-2 cursor-pointer"
      onClick={() => onClickPokemon(pokemon.name)}
    >
      <CustomImage
        src={pokemon.thumbnail}
        width={90}
        height={90}
        className="transition-transform duration-300 ease-in-out hover:scale-125"
      />
      <div className="font-bold text-base capitalize">{formattedName}</div>
      <div className="flex justify-center items-center gap-2">
        {pokemon.types.map((type, i_type) => (
          <ChipType key={i_type} type={type.type.name}>
            {type.type.name}
          </ChipType>
        ))}
      </div>
    </div>
  );
}
