import { useQuery } from '@tanstack/react-query';
import { getPokemonList } from '@/lib/api/pokemon';
import type { BaseResponse } from "@/types/base";
import type { PokemonList } from "@/types/pokemon";

interface UsePokemonDataOptions {
  limit: number;
  offset: number;
  searchQuery: string;
  enabled: boolean;
  initialData?: BaseResponse<PokemonList[]> | null; // Tambahkan initialData
}

const fetchPokemonAdditionalData = async (
  limit: number,
  offset: number,
  q: string
): Promise<BaseResponse<PokemonList[]> | null> => {
  // Tambahkan sedikit delay untuk simulasi latency jaringan
  await new Promise(resolve => setTimeout(resolve, 300));
  const data = await getPokemonList({ offset, limit, q });
  return data;
};

export const usePokemonData = ({
  limit,
  offset,
  searchQuery,
  enabled,
  initialData,
}: UsePokemonDataOptions) => {
  return useQuery<BaseResponse<PokemonList[]> | null, Error>({
    queryKey: ["pokemonList", limit, offset, searchQuery],
    queryFn: () =>
      fetchPokemonAdditionalData(limit, offset, searchQuery),
    enabled: enabled,
    initialData: initialData || undefined, // Pastikan undefined jika null
  });
};