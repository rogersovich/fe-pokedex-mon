import type { BaseResponse } from "@/types/base-types";
import type { PokemonList } from "@/types/pokemon-types";

import { apiFetch } from "./base";

export async function getPokemonList(): Promise<BaseResponse<PokemonList[]>> {
  return apiFetch<BaseResponse<PokemonList[]>>('/pokemon', {
    params: {
      limit: 20
    }
  });
}