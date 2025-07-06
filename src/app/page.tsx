import PokemonGroupCard from "@/components/PokemonGroupCard";
import { getPokemonList } from "@/lib/api/pokemon";

import type { BaseResponse } from "@/types/base";
import type { PokemonList } from "@/types/pokemon";
import PokemonPageControl from "@/components/PokemonPageControl";
import InputSearchPokemon from "@/components/InputSearchPokemon";
import SelectTypePokemon from "@/components/SelectTypePokemon";
import { default as PokemonClientPageWrapper } from "@/app/components/ClientPageWrapper";

// Define a default limit for your API calls
const LIMIT = 9;
const OFFSET = 0;

export default async function Home() {
  let pokemonResponse: BaseResponse<PokemonList[]> | null = null;
  let pokemonError: string | null = null;

  try {
    const [pokemonData] = await Promise.all([
      getPokemonList({ offset: OFFSET, limit: LIMIT }),
      // getPokemonTypeList(),
    ]);

    pokemonResponse = pokemonData;
    // pokemonTypeResponse = pokemonTypeData;
  } catch (err) {
    if (err instanceof Error) {
      pokemonError = err.message;
    } else {
      pokemonError = "An unknown error occurred while fetching Pokemon.";
    }
  }

  return (
    <>
      <PokemonClientPageWrapper
        pokemonResponse={pokemonResponse}
        pokemonError={pokemonError}
      />
    </>
  );
}
