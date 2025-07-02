import type { BaseResponse } from "@/types/base";
import type { PokemonList } from "@/types/pokemon";

import { apiFetch } from "./base";

export interface GetPokemonListOptions {
  offset?: number;
  limit?: number;
  type?: string;
  q?: string;
}

export async function getPokemonList(
  options?: GetPokemonListOptions
): Promise<BaseResponse<PokemonList[]>> {
  // Pass offset and limit as query parameters
  const params: Record<string, string | number> = {};
  if (options?.offset !== undefined) {
    params.offset = options.offset;
  }
  if (options?.limit !== undefined) {
    params.limit = options.limit;
  }
  if (options?.type) {
    params.type = options.type;
  }
  if (options?.q) {
    params.q = options.q;
  }

  return apiFetch<BaseResponse<PokemonList[]>>("/pokemon", {
    params,
  });
}
