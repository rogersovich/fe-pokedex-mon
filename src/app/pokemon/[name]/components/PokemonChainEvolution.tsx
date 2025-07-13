// components/EvolutionChart.tsx
import React from "react";
import clsx from "clsx";
import EvolutionInfoLevel from "./EvolutionInfoLevel";
import EvolutionCard from "./EvolutionCard";
import type { TEvolution, TEvolutionChain } from "@/types/pokemon";

interface EvolutionChartProps {
  evolutionData: TEvolution;
}

const EvolutionChart: React.FC<EvolutionChartProps> = ({ evolutionData }) => {
  if (!evolutionData) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading evolution data...
      </div>
    );
  }

  const renderEvolutionFlow = (
    evolutionNode: TEvolutionChain | TEvolution["chain"]
  ) => {
    const currentPokemon = evolutionNode;

    return (
      <div className="flex items-center justify-center w-full my-2">
        <EvolutionCard pokemonNode={currentPokemon} />

        {/* Render arrow and level for the *next* evolution */}
        {currentPokemon.evolves_to && currentPokemon.evolves_to.length > 0 && (
          <EvolutionInfoLevel evolutionData={currentPokemon.evolves_to} />
        )}

        {/* Recursively render next evolutions */}
        {currentPokemon.evolves_to && currentPokemon.evolves_to.length > 0 && (
          <div
            className={clsx(
              currentPokemon.evolves_to.length < 3 && "flex items-center",
              currentPokemon.evolves_to.length > 3 && "grid grid-cols-3 gap-2"
            )}
          >
            {currentPokemon.evolves_to.map((nextEvolution, index) => (
              <React.Fragment key={index}>
                {renderEvolutionFlow(nextEvolution)}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <h2 className="text-3xl font-extrabold mb-4">Evolution chart</h2>
      <div className="flex flex-wrap items-center w-full justify-center">
        {renderEvolutionFlow(evolutionData.chain)}
      </div>
    </>
  );
};

export default EvolutionChart;
