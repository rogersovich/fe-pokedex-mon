import { getPokemonList } from "@/lib/api/pokemon";

import type { BaseResponse } from "@/types/base-types";
import type { PokemonList } from "@/types/pokemon-types";
import PokemonGroupCard from "@/components/PokemonGroupCard";

export default async function Home() {
  let pokemonList: BaseResponse<PokemonList[]> | null = null;
  let pokemonError: string | null = null;

  try {
    pokemonList = await getPokemonList();
  } catch (err) {
    if (err instanceof Error) {
      pokemonError = err.message;
    } else {
      pokemonError = "An unknown error occurred while fetching Pokemon.";
    }
  }

  return (
    <>
      <div className="base-card">test</div>
      <div className="grid grid-cols-12 gap-4">
        <PokemonGroupCard
          pokemonError={pokemonError}
          pokemonList={pokemonList}
        />
      </div>
    </>
  );
}
