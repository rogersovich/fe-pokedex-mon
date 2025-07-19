import type { TTraining } from "@/types/pokemon";
import React from "react";

interface MyProps {
  training: TTraining;
}

export default function PokemonTrainingData({ training }: MyProps) {
  return (
    <>
      <div className="text-3xl font-extrabold mb-4">Training</div>
      <div className="grid grid-cols-12 gap-x-4 gap-y-2">
        <div className="col-span-6">Catch Rate</div>
        <div className="col-span-6">
          <div className="flex flex-col items-start gap-1 text-sm">
            <span>{training.capture_rate_percent}%</span>
          </div>
        </div>
        <div className="col-span-6">Base Friendship</div>
        <div className="col-span-6">
          <span className="text-sm">{training.base_happiness}</span>
        </div>
        <div className="col-span-6">Base Exp</div>
        <div className="col-span-6">
          <span className="text-sm">{training.base_experience}</span>
        </div>
        <div className="col-span-6">Growth Rate</div>
        <div className="col-span-6">
          <span className="text-sm">{training.growth_rate}</span>
        </div>
      </div>
    </>
  );
}
