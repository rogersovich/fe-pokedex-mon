import { getPokemon } from "@/lib/api";
import React from "react";
import type { BasePokemonDetail } from "@/types/pokemon";
import PokemonGeneralData from "./components/PokemonGeneralData";
import CustomImage from "@/components/CustomImage";
import PokemonTrainingData from "./components/PokemonTrainingData";
import PokemonBreedingData from "./components/PokemonBreedingData";
import PokemonBaseStat from "./components/PokemonBaseStat";
import PokemonChainEvolution from "./components/PokemonChainEvolution";
import PokemonOtherNames from "./components/PokemonOtherNames";
import PokemonDamageRelation from "./components/PokemonDamageRelation";
import PokemonNavigation from "./components/PokemonNavigation";
import PokemonMoves from "./components/PokemonMoves/PokemonMoves";
import clsx from "clsx";
import { pokemonTextColor } from "@/lib/pokemon-color";
import type { Metadata, ResolvingMetadata } from "next";
import { formatPokemonName } from "@/lib/string-formatter";

interface PokemonPageProps {
  params: Promise<{
    name: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params }: PokemonPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).name
 
  // fetch post information
  const [pokemonData] = await Promise.all([getPokemon(slug)]);

  const pokemonName = formatPokemonName(pokemonData.data.item.name)
  const title = `${pokemonName} Pokedex`
 
  return {
    title: title,
    description: "whatever",
  }
}

const formatGeneration = (gen: string) => {
  switch (gen) {
    case "generation-i":
      return "1";
    case "generation-ii":
      return "2";
    case "generation-iii":
      return "3";
    case "generation-iv":
      return "4";
    case "generation-v":
      return "5";
    case "generation-vi":
      return "6";
    case "generation-vii":
      return "7";
    case "generation-viii":
      return "8";
    case "generation-ix":
      return "9";
    default:
      return gen;
  }
};

export default async function PokemonNamePage({ params }: PokemonPageProps) {
  const awaitedParams = await params;
  let pokemonResponse: BasePokemonDetail | null = null;
  let pokemonError: string | null = null;

  try {
    const [pokemonData] = await Promise.all([getPokemon(awaitedParams.name)]);

    pokemonResponse = pokemonData.data;
  } catch (err) {
    if (err instanceof Error) {
      pokemonError = err.message;
    } else {
      pokemonError = "An unknown error occurred while fetching Pokemon.";
    }
  }

  return (
    <>
      {pokemonResponse && (
        <>
          <div className="base-card w-full">
            <div className="grid grid-cols-12 gap-x-3 gap-y-10 p-3">
              <div className="col-span-12">
                <div className="flex items-center gap-1 text-lg">
                  <div className="capitalize">{pokemonResponse.item.name}</div>
                  <div>is a</div>
                  <div className="flex items-center">
                    {pokemonResponse.item.types.map((type, i_type) => (
                      <div
                        key={i_type}
                        className={clsx(
                          "font-bold capitalize",
                          pokemonTextColor(type.type.name)
                        )}
                      >
                        {type.type.name}
                        {pokemonResponse.item.types.length - 1 !== i_type && (
                          <span>/</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div>
                    {`type Pokémon introduced in generation ${formatGeneration(
                      pokemonResponse.item.generation.name
                    )}`}
                  </div>
                </div>
              </div>
              <div className="col-span-6">
                <div className="w-full h-full relative">
                  <CustomImage
                    src={pokemonResponse.item.thumbnail}
                    width={250}
                    height={250}
                    fill={true}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
              <div className="col-start-7 col-span-6">
                <PokemonGeneralData pokemon={pokemonResponse.item} />
              </div>
              <div className="col-span-5">
                <PokemonTrainingData training={pokemonResponse.item.training} />
              </div>
              <div className="col-start-7 col-span-5">
                <PokemonBreedingData breeding={pokemonResponse.item.breeding} />
              </div>
              <div className="col-span-12">
                <PokemonBaseStat pokeStats={pokemonResponse.item.stats} />
              </div>
              <div className="col-span-12">
                <PokemonChainEvolution
                  evolutionData={pokemonResponse.item.evolution}
                />
              </div>
              <div className="col-span-12">
                <PokemonDamageRelation
                  pokemon_id={pokemonResponse.item.id}
                  pokemon_types={pokemonResponse.item.types}
                />
              </div>
              {pokemonResponse.item.grouped_moves && (
                <div className="col-span-12">
                  <PokemonMoves
                    pokeMoves={pokemonResponse.item.grouped_moves}
                    pokemonName={pokemonResponse.item.name}
                  />
                </div>
              )}
              <div className="col-span-12">
                <PokemonOtherNames
                  pokeOtherNames={pokemonResponse.item.other_names}
                />
              </div>
            </div>
          </div>
          <PokemonNavigation
            prev={pokemonResponse.prev}
            next={pokemonResponse.next}
          />
        </>
      )}
    </>
  );
}
