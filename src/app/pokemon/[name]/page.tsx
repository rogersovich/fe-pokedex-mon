import { getPokemon } from "@/lib/api";
import React from "react";
import PokemonGeneralData from "./components/PokemonGeneralData";
import CustomImage from "@/components/CustomImage";
import PokemonTrainingData from "./components/PokemonTrainingData";
import PokemonBreedingData from "./components/PokemonBreedingData";
import PokemonBaseStat from "./components/PokemonBaseStat";
import type { TPokemonDetailResponse } from "@/types/pokemon";
import PokemonChainEvolution from "./components/PokemonChainEvolution";
import PokemonOtherNames from "./components/PokemonOtherNames";
import PokemonDamageRelation from "./components/PokemonDamageRelation";

interface PokemonPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function PokemonNamePage({ params }: PokemonPageProps) {
  const awaitedParams = await params;
  let pokemonResponse: TPokemonDetailResponse | null = null;
  let pokemonError: string | null = null;

  try {
    const [pokemonData] = await Promise.all([getPokemon(awaitedParams.name)]);

    pokemonResponse = pokemonData;
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
        <div className="base-card w-full">
          <div className="grid grid-cols-12 gap-x-3 gap-y-10 p-3">
            <div className="col-span-12">
              <div className="flex items-center gap-1 text-lg">
                <div className="capitalize">{pokemonResponse.name}</div>
                <div>is a</div>
                <div className="flex items-center">
                  {pokemonResponse.types.map((type, i_type) => (
                    <div key={i_type} className="font-bold capitalize">
                      {type.type.name}
                      {pokemonResponse.types.length - 1 !== i_type && (
                        <span>/</span>
                      )}
                    </div>
                  ))}
                </div>
                <div>type Pokémon introduced in Generation 1.</div>
              </div>
            </div>
            <div className="col-span-5">
              <div className="w-full h-full relative">
                <CustomImage
                  src={pokemonResponse.thumbnail}
                  width={250}
                  height={250}
                  fill={true}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
            <div className="col-span-7">
              <PokemonGeneralData pokemon={pokemonResponse} />
            </div>
            <div className="col-span-5">
              <PokemonTrainingData pokemon={pokemonResponse} />
            </div>
            <div className="col-span-6">
              <PokemonBreedingData pokemon={pokemonResponse} />
            </div>
            <div className="col-span-12">
              <PokemonBaseStat pokemon={pokemonResponse} />
            </div>
            <div className="col-span-12">
              <PokemonChainEvolution
                evolutionData={pokemonResponse.evolution}
              />
            </div>
            <div className="col-span-9">
              <PokemonDamageRelation
                pokemon_id={pokemonResponse.id}
                pokemon_types={pokemonResponse.types}
              />
            </div>
            <div className="col-span-12">
              <PokemonOtherNames pokemon={pokemonResponse} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
