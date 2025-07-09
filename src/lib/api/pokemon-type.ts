import type { BaseResponse } from "@/types/base";
import type { TBaseType } from "@/types/types";
import { apiFetch, apiFetchPokeApi } from "./base";
import type { TBasePokemonWeakness } from "@/types/pokemon";

export interface GetPokemonWeaknessTypeOptions {
  types?: any[];
}

export async function getPokemonTypeList(): Promise<BaseResponse<TBaseType[]>> {
  return apiFetchPokeApi<BaseResponse<TBaseType[]>>("/type", {
    params: {
      limit: 20,
    },
  });
}

export async function getPokemonWeaknessType(
  pokemon_id: number,
  options: GetPokemonWeaknessTypeOptions
): Promise<TBasePokemonWeakness> {
  // Pass offset and limit as query parameters
  const params: Record<string, string | number> = {};

  if (options?.types) {
    if (options?.types?.length > 0) {
      const typeNames = options?.types.map(item => item.type.name);
      const arrStr = typeNames.join(',');
      params.types = arrStr
    }
  }

  return apiFetch<TBasePokemonWeakness>(`/type/weakness/${pokemon_id}`, {
    params: params,
  });
}
