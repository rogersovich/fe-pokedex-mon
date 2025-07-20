import { getPokemonList } from "@/lib/api/pokemon";

import type { BaseResponse } from "@/types/base";
import type { BasePokemonList, PokemonList } from "@/types/pokemon";
import { default as PokemonClientPageWrapper } from "@/app/pokemon/components/ClientPageWrapper";
import type { Metadata } from "next";

// Define a default limit for your API calls
const LIMIT = 15;
const OFFSET = 0;

export const metadata: Metadata = {
  title: 'Pokemon Pokedex',
  description: '...',
}
 

export default async function PokemonPage() {
  let pokemonResponse: BaseResponse<BasePokemonList> | null = null;
  let pokemonError: string | null = null;

  try {
    const [pokemonData] = await Promise.all([
      getPokemonList({ offset: OFFSET, limit: LIMIT }),
    ]);

    pokemonResponse = pokemonData;
  } catch (err) {
    if (err instanceof Error) {
      pokemonError = err.message;
    } else {
      pokemonError = "An unknown error occurred while fetching Pokemon.";
    }
  }

  return (
    <PokemonClientPageWrapper
      pokemonDataSSR={pokemonResponse}
      pokemonError={pokemonError}
    />
  );
}
