import type { BaseResponse } from "@/types/base";
import type { TBaseType } from "@/types/types";
import { apiFetchPokeApi } from "./base";

export async function getPokemonTypeList(): Promise<BaseResponse<TBaseType[]>> {
  return apiFetchPokeApi<BaseResponse<TBaseType[]>>('/type', {
    params: {
      limit: 20
    }
  });
}