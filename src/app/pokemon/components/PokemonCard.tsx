"use client";

import React from "react";
import ChipType from "@/components/ChipType";
import type { PokemonList } from "@/types/pokemon";
import ImageWithFallback from "./ImageWithFallback";

export default function PokemonCard({ pokemon }: { pokemon: PokemonList }) {
  return (
    <div className="base-card !py-8 flex flex-col justify-center items-center gap-2 cursor-pointer">
      <ImageWithFallback
        src={pokemon.thumbnail}
        alt={pokemon.name}
        width={90}
        height={90}
        quality={10}
        loading="lazy"
        className="transition-transform duration-300 ease-in-out hover:scale-125"
      />
      <div className="font-bold text-base capitalize">{pokemon.name}</div>
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
