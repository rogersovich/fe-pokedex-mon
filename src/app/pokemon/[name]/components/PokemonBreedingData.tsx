import { formatNumberWithThousandsSeparator } from "@/lib/number-formatter";
import type { TPokemonDetailResponse } from "@/types/pokemon";
import React from "react";

interface MyProps {
  pokemon: TPokemonDetailResponse;
}

export default function PokemonBreedingData({ pokemon }: MyProps) {
  const eggCyles = formatNumberWithThousandsSeparator(
    pokemon.breeding.egg_cycles
  );

  return (
    <>
      <div className="text-3xl font-extrabold mb-4">Breeding</div>
      <div className="grid grid-cols-12 gap-x-4 gap-y-2">
        <div className="col-span-4">Egg Group</div>
        <div className="col-span-8">
          <div className="flex items-center gap-1 text-sm">
            {pokemon.breeding.egg_groups.map((egg_group, i_egg_group) => (
              <span
                key={i_egg_group}
                className="capitalize text-blue-500 cursor-pointer hover:underline"
              >
                {egg_group.name}
                {i_egg_group !== pokemon.breeding.egg_groups.length - 1 && ","}
              </span>
            ))}
          </div>
        </div>
        <div className="col-span-4">Gender</div>
        <div className="col-span-8">
          <div className="text-sm flex items-center gap-1">
            <span className="text-blue-500">
              {pokemon.breeding.gender_rate.female},
            </span>
            <span className="text-pink-500">
              {pokemon.breeding.gender_rate.male}
            </span>
          </div>
        </div>
        <div className="col-span-4">Egg Cycles</div>
        <div className="col-span-8">
          <span className="text-sm text-zinc-500">{`${eggCyles} steps`} </span>
        </div>
        <div className="col-span-4">Hatch Counter</div>
        <div className="col-span-8">
          <span className="text-sm">{pokemon.breeding.hatch_counter}</span>
        </div>
      </div>
    </>
  );
}
