import PokemonGroupCard from "@/components/pokemon-group-card";
import { getPokemonTypeList } from "@/lib/api/pokemon-type";
import { getPokemonList } from "@/lib/api/pokemon";

import type { BaseResponse } from "@/types/base";
import type { PokemonList } from "@/types/pokemon";
import type { TBaseType } from "@/types/types";
import ChipType from "@/components/chip-type";
import PokemonPageControl from "@/components/pokemon-page-control";

// Define a default limit for your API calls
const ITEMS_PER_PAGE = 20;

// Page components in the App Router receive searchParams as a prop
interface PokemonPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: PokemonPageProps) {
  let pokemonResponse: BaseResponse<PokemonList[]> | null = null;
  let pokemonError: string | null = null;
  let pokemonTypeResponse: BaseResponse<TBaseType[]> | null = null;

  // Extract offset from searchParams, default to 0 if not present or invalid
  const offset = parseInt((searchParams.offset as string) || "0", 10);
  const limit = parseInt(
    (searchParams.limit as string) || String(ITEMS_PER_PAGE),
    10
  );

  try {
    const [pokemonData, pokemonTypeData] = await Promise.all([
      getPokemonList({ offset, limit }),
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
        <input
          placeholder="Search pokemon..."
          type="text"
          className="w-full focus:outline-none"
        />
      </div>
      <div className="base-card">
        <div className="flex flex-wrap justify-center items-center gap-2">
          {pokemonTypeResponse?.results.map((type, i_type) => (
            <ChipType key={i_type} type={type.name}>
              {type.name}
            </ChipType>
          ))}
        </div>
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
