// components/EvolutionChart.tsx
import ChipType from "@/components/ChipType";
import CustomImage from "@/components/CustomImage";
import type { TEvolution, TEvolutionChain } from "@/types/pokemon";
import React from "react";
import { IconArrowRight } from "@tabler/icons-react";
import clsx from "clsx";

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

  // Helper function to extract ID from URL
  const getIdFromUrl = (url: string | undefined): string => {
    if (!url) return "";
    const parts = url.split("/");
    return parts[parts.length - 2] || "";
  };

  // Function to get Tailwind color class for a given type
  const getTypeColorClass = (typeName: string): string => {
    switch (typeName.toLowerCase()) {
      case "grass":
        return "bg-green-500";
      case "poison":
        return "bg-purple-500";
      case "fire":
        return "bg-red-500";
      case "water":
        return "bg-blue-500";
      case "electric":
        return "bg-yellow-400";
      case "bug":
        return "bg-lime-600";
      case "normal":
        return "bg-gray-400";
      case "fighting":
        return "bg-orange-700";
      case "flying":
        return "bg-indigo-400";
      case "ground":
        return "bg-amber-600";
      case "rock":
        return "bg-stone-500";
      case "ghost":
        return "bg-indigo-700";
      case "steel":
        return "bg-gray-500";
      case "fairy":
        return "bg-pink-300";
      case "dragon":
        return "bg-indigo-800";
      case "ice":
        return "bg-cyan-300";
      case "dark":
        return "bg-gray-700";
      case "psychic":
        return "bg-fuchsia-600";
      default:
        return "bg-gray-500"; // Default color
    }
  };

  const renderPokemonCard = (
    pokemonNode: TEvolutionChain,
    evolutionDetails: any = []
  ) => {
    // Prioritize evolution_type.name for evolved forms, species.name for base form
    const name = pokemonNode.evolution_type?.name || pokemonNode.species?.name;
    const id = pokemonNode.species?.url
      ? getIdFromUrl(pokemonNode.species.url)
      : pokemonNode.evolution_type?.id
      ? String(pokemonNode.evolution_type.id)
      : "";
    const types = pokemonNode.evolution_type?.types;
    const evoDetails = pokemonNode.evolution_details;

    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    return (
      <>
        {evoDetails.length > 0 && (
          <div className="flex flex-col gap-2 items-center">
            <IconArrowRight size={20} />
            {`(use ${evoDetails[0].item.name})`}
          </div>
        )}
        <div className="flex flex-col items-center p-2 min-w-[150px]">
          <CustomImage src={imageUrl} width={100} height={100} />
          <div className="text-sm text-gray-600 mb-1">
            #{String(id).padStart(4, "0")}
          </div>
          <div className="font-bold text-lg capitalize mb-2">{name}</div>
          {types && (
            <div className="flex justify-center gap-1 flex-wrap">
              {types.map((typeInfo, index) => (
                <ChipType key={index} type={typeInfo.type.name}>
                  {typeInfo.type.name}
                </ChipType>
              ))}
            </div>
          )}
        </div>
      </>
    );
  };

  const renderEvolutionFlow = (
    evolutionNode: TEvolutionChain | TEvolution["chain"]
  ) => {
    const currentPokemon = evolutionNode;

    return (
      <div className="flex items-center justify-center w-full my-2">
        {renderPokemonCard(currentPokemon, currentPokemon.evolution_details)}

        {/* Render arrow and level for the *next* evolution */}
        {currentPokemon.evolves_to && currentPokemon.evolves_to.length > 0 && (
          <div className="flex flex-col items-center mx-4 gap-y-2">
            <IconArrowRight size={20} />
            {currentPokemon.evolves_to[0]?.evolution_details &&
            currentPokemon.evolves_to[0].evolution_details.length > 0 &&
            currentPokemon.evolves_to[0].evolution_details[0].min_level ? (
              <span className="text-sm text-gray-600 whitespace-nowrap">
                (Level{" "}
                {currentPokemon.evolves_to[0].evolution_details[0].min_level})
              </span>
            ) : null}
          </div>
        )}

        {/* Recursively render next evolutions */}
        {currentPokemon.evolves_to && currentPokemon.evolves_to.length > 0 && (
          <div
            className={clsx(
              "flex items-center",
              currentPokemon.evolves_to.length > 3 && "flex-col"
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
