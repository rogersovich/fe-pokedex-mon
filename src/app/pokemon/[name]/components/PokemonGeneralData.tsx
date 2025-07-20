import ChipType from "@/components/ChipType";
import {
  decimetersToFeetInches,
  decimetersToMeters,
  hectogramsToKilograms,
  hectogramsToPounds,
} from "@/lib/pokemon-size";
import { formatName } from "@/lib/string-formatter";
import type { TPokemonDetailResponse } from "@/types/pokemon";
import React from "react";

  interface PokemonGeneralDataProps {
    pokemon: TPokemonDetailResponse;
  }

export default function PokemonGeneralData({
  pokemon,
}: PokemonGeneralDataProps) {
  return (
    <>
      <div className="text-3xl font-extrabold mb-4">Pokédex data</div>
      <div className="grid grid-cols-12 gap-x-4 gap-y-2">
        <div className="col-span-4">National №</div>
        <div className="col-span-8">00{pokemon.id}</div>
        <div className="col-span-4">Type</div>
        <div className="col-span-8">
          <div className="flex items-center gap-2">
            {pokemon.types.map((type, i_type) => (
              <ChipType key={i_type} type={type.type.name}>
                {type.type.name}
              </ChipType>
            ))}
          </div>
        </div>
        <div className="col-span-4">Species</div>
        <div className="col-span-8">Insect Pokémon</div>
        <div className="col-span-4">Height</div>
        <div className="col-span-8">
          <div className="flex items-center gap-2">
            <span>{decimetersToMeters(pokemon.height)} m</span>
            <span>({decimetersToFeetInches(pokemon.height)})</span>
          </div>
        </div>
        <div className="col-span-4">Weight</div>
        <div className="col-span-8">
          <div className="flex items-center gap-2">
            <span>{hectogramsToKilograms(pokemon.weight)} kg</span>
            <span>{hectogramsToPounds(pokemon.weight)} lbs</span>
          </div>
        </div>
        <div className="col-span-4">Abilities</div>
        <div className="col-span-8">
          {pokemon.abilities.map((ability, i_ability) => (
            <div key={i_ability} className="flex items-center gap-1">
              <span>{i_ability + 1}.</span>
              <span>{formatName(ability.ability.name)}</span>
              {ability.is_hidden && (
                <span className="text-sm italic">(hidden ability)</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
