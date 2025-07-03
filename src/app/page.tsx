import PokemonGroupCard from "@/components/pokemon-group-card";
import { getPokemonTypeList } from "@/lib/api/pokemon-type";
import { getPokemonList } from "@/lib/api/pokemon";

import type { BaseResponse } from "@/types/base";
import type { PokemonList } from "@/types/pokemon";
import type { TBaseType } from "@/types/types";
import PokemonPageControl from "@/components/pokemon-page-control";
import InputSearchPokemon from "@/components/input-search-pokemon";

// Define a default limit for your API calls
const ITEMS_PER_PAGE = 20;

// Page components in the App Router receive searchParams as a prop
interface PokemonPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home({ searchParams }: PokemonPageProps) {
  let pokemonResponse: BaseResponse<PokemonList[]> | null = null;
  let pokemonError: string | null = null;
  let pokemonTypeResponse: BaseResponse<TBaseType[]> | null = null;

  // Await searchParams before accessing its properties
  const resolvedSearchParams = await searchParams;

  // Extract offset from searchParams, default to 0 if not present or invalid
  const offset = parseInt((resolvedSearchParams.offset as string) || "0", 10);
  const limit = parseInt(
    (resolvedSearchParams.limit as string) || String(ITEMS_PER_PAGE),
    10
  );
  const q = (resolvedSearchParams.q as string) || "";

  try {
    const [pokemonData, pokemonTypeData] = await Promise.all([
      getPokemonList({ offset, limit, q }),
      getPokemonTypeList(),
    ]);

    pokemonResponse = pokemonData;
    pokemonTypeResponse = pokemonTypeData;
  } catch (err) {
    if (err instanceof Error) {
      pokemonError = err.message;
    } else {
      pokemonError = "An unknown error occurred while fetching Pokemon.";
    }
  }

  return (
    <>
      <div className="base-card">
       <InputSearchPokemon limit={limit} offset={offset} q={q} />
      </div>
      <div className="base-card">
        <PokemonPageControl
          count={pokemonResponse?.count || 0}
          limit={limit}
          nextUrl={pokemonResponse?.next}
          previousUrl={pokemonResponse?.previous}
        />
      </div>
      <div className="grid grid-cols-12 gap-4">
        <PokemonGroupCard
          pokemonError={pokemonError}
          pokemonList={pokemonResponse}
        />
      </div>
    </>
  );
}
