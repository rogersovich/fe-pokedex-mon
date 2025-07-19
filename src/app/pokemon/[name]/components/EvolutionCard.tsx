import React from "react";
import CustomImage from "@/components/CustomImage";
import type { TEvolutionChain } from "@/types/pokemon";
import ChipType from "@/components/ChipType";
import { formatPokemonName } from "@/lib/string-formatter";
import Link from "next/link";

interface EvolutionCardProps {
  pokemonNode: TEvolutionChain;
}

const getIdFromUrl = (url: string | undefined): string => {
  if (!url) return "";
  const parts = url.split("/");
  return parts[parts.length - 2] || "";
};

const EvolutionCard: React.FC<EvolutionCardProps> = ({ pokemonNode }) => {
  // Destructure for cleaner access
  const {
    evolution_type,
    species,
    evolution_details: evoDetails,
  } = pokemonNode;

  // Prioritize evolution_type.name for evolved forms, species.name for base form
  const name = evolution_type?.name || species?.name;
  const pokemonName = species.name; // Keep original pokemonName from species
  const id = species?.url
    ? getIdFromUrl(species.url)
    : evolution_type?.id
    ? String(evolution_type.id)
    : "";
  const types = evolution_type?.types;

  // Filter logic (now inside the component)
  const getEvoItem = evoDetails.filter(
    (detail: any) => detail.item && detail.item.name !== ""
  );

  const getEvoByMinHappiness = evoDetails.filter(
    (detail: any) => detail.min_happiness !== null && detail.min_happiness > 0
  );

  const getEvoByMove = evoDetails.filter(
    (detail: any) => detail.known_move !== null && detail.known_move.name !== ""
  );

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <>
      <div className="flex flex-col items-center p-2 min-w-[150px]">
        {/* Replace CustomImage with your actual image component or <img> tag */}
        <Link href={`/pokemon/${pokemonName}`}>
          <CustomImage
            src={imageUrl}
            alt={name || "Pokemon"}
            width={100}
            height={100}
          />
        </Link>
        <div className="text-sm text-gray-600 mb-1 mt-2">
          #{String(id).padStart(4, "0")}
        </div>
        <div className="font-bold text-lg capitalize mb-2 text-blue-500 hover:underline">
          <Link href={`/pokemon/${pokemonName}`}>{name}</Link>
        </div>
        {types && (
          <div className="flex justify-center gap-1 flex-wrap">
            {types.map((typeInfo, index) => (
              <ChipType key={index} type={typeInfo.type.name}>
                {typeInfo.type.name}
              </ChipType>
            ))}
          </div>
        )}
        {getEvoItem.length > 0 && pokemonName !== "sylveon" && (
          <div className="mt-3 text-xs">{`(use ${formatPokemonName(
            getEvoItem[0].item.name
          )})`}</div>
        )}
        {getEvoByMinHappiness.length > 0 &&
          getEvoByMinHappiness[0].min_happiness > 100 &&
          pokemonName !== "sylveon" && (
            <>
              <div className="items-baseline flex text-xs mt-3">
                {"("}
                <span className="flex items-center gap-1">
                  <span>high</span>
                  <span>Friendship</span>
                </span>
                {getEvoByMinHappiness[0].time_of_day !== "" && (
                  <>
                    <span className="mr-0.5">,</span>
                    <span className="text-xs capitalize">
                      {getEvoByMinHappiness[0].time_of_day}
                    </span>
                  </>
                )}
                {")"}
              </div>
            </>
          )}
        {pokemonName === "sylveon" && (
          <div className="text-center text-xs mt-3">
            (after Fairy-type move learned, and either ♥♥ Affection in Gen 6-7
            or high friendship in Gen 8+)
          </div>
        )}
        {getEvoByMove.length > 0 && (
          <span className="mt-3 text-xs max-w-[8rem] text-center">
            (after <b>{formatPokemonName(getEvoByMove[0].known_move.name)}</b>{" "}
            learned)
          </span>
        )}
      </div>
    </>
  );
};

export default EvolutionCard;
