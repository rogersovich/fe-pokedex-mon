import type { TPokemonDetailResponse } from "@/types/pokemon";
import React from "react";

interface MyProps {
  pokemon: TPokemonDetailResponse;
}

export default function PokemonTrainingData({ pokemon }: MyProps) {
  return (
    <>
      <div className="text-3xl font-extrabold mb-4">Training</div>
      <div className="grid grid-cols-12 gap-x-4 gap-y-2">
        <div className="col-span-4">Catch Rate</div>
        <div className="col-span-8">
          <div className="flex flex-col items-start gap-1 text-sm">
            <span>{pokemon.training.capture_rate_percent}%</span>
          </div>
        </div>
        <div className="col-span-4">Base Friendship</div>
        <div className="col-span-8">
          <span className="text-sm">{pokemon.training.base_happiness}</span>
        </div>
        <div className="col-span-4">Base Exp</div>
        <div className="col-span-8">
          <span className="text-sm">{pokemon.training.base_experience}</span>
        </div>
        <div className="col-span-4">Growth Rate</div>
        <div className="col-span-8">
          <span className="text-sm">{pokemon.training.growth_rate}</span>
        </div>
      </div>
    </>
  );
}
