import { useQuery } from "@tanstack/react-query";
import type { PokemonType, TBasePokemonWeakness } from "@/types/pokemon";
import {
  getPokemonWeaknessType,
} from "@/lib/api/pokemon-type";
import type { BaseResponse } from "@/types/base";
import type { TBaseType } from "@/types/types";

interface UsePokemonWeaknessTypeDataOptions {
  pokemon_id: number;
  pokemon_types: PokemonType[];
  enabled: boolean;
}

const fetchPokemonAdditionalData = async (
  pokemon_id: number,
  pokemon_types: PokemonType[]
): Promise<BaseResponse<TBasePokemonWeakness>> => {
  const data = await getPokemonWeaknessType(pokemon_id, {
    types: pokemon_types,
  });
  return data;
};

export const usePokemonWeaknessTypeData = ({
  pokemon_id,
  pokemon_types,
  enabled,
}: UsePokemonWeaknessTypeDataOptions) => {
  return useQuery<BaseResponse<TBasePokemonWeakness> | null, Error>({
    queryKey: ["pokemon-weaknes-type", pokemon_id, pokemon_types],
    queryFn: () => fetchPokemonAdditionalData(pokemon_id, pokemon_types),
    enabled: enabled,
  });
};
