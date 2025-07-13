"use client";

import { IconArrowRight } from "@tabler/icons-react";
import React from "react";

export default function EvolutionInfoLevel({
  evolutionData,
}: {
  evolutionData: any;
}) {
  const firstEvolution = evolutionData[0];
  const hasEvolutionDetails =
    firstEvolution?.evolution_details &&
    firstEvolution.evolution_details.length > 0;
  const minLevel = hasEvolutionDetails
    ? firstEvolution.evolution_details[0].min_level
    : null;

  return (
    <div className="flex flex-col items-center mx-4 gap-y-2">
      <IconArrowRight size={20} />
      {minLevel ? (
        <span className="text-sm text-gray-600 whitespace-nowrap">
          (Level {minLevel})
        </span>
      ) : null}
    </div>
  );
}
