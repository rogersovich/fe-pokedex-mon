import ChipType from "@/components/ChipType";
import ImageWithFallback from "@/components/ImageWithFallback";
import { getPokemon } from "@/lib/api";
import {
  decimetersToFeetInches,
  decimetersToMeters,
  hectogramsToKilograms,
  hectogramsToPounds,
} from "@/lib/pokemon-size";
import { formatPokemonName } from "@/lib/string-formatter";
import type { TPokemonDetailResponse } from "@/types/pokemon";
import React from "react";
import PokemonGeneralData from "./components/PokemonGeneralData";
import CustomImage from "@/components/CustomImage";
import PokemonTrainingData from "./components/PokemonTrainingData";
import PokemonBreedingData from "./components/PokemonBreedingData";

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
          <div className="grid grid-cols-12 gap-x-3 gap-y-6 p-3">
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
              <div className="flex items-center justify-center">
                <CustomImage
                  src={pokemonResponse.thumbnail}
                  width={250}
                  height={250}
                />
              </div>
            </div>
            <div className="col-span-7">
              <PokemonGeneralData pokemon={pokemonResponse} />
            </div>
            <div className="col-span-6">
              <PokemonTrainingData pokemon={pokemonResponse} />
            </div>
            <div className="col-span-6">
              <PokemonBreedingData pokemon={pokemonResponse} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
