import { getPokemonList } from "@/lib/api/pokemon";

import type { BaseResponse } from "@/types/base";
import type { PokemonList } from "@/types/pokemon";
import { default as PokemonClientPageWrapper } from "@/app/pokemon/components/ClientPageWrapper";

// Define a default limit for your API calls
const LIMIT = 9;
const OFFSET = 0;

export default async function PokemonPage() {
  let pokemonResponse: BaseResponse<PokemonList[]> | null = null;
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
      pokemonResponse={pokemonResponse}
      pokemonError={pokemonError}
    />
  );
}
