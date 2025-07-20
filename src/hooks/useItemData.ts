import { useQuery } from '@tanstack/react-query';
import type { BaseResponse } from "@/types/base";
import type { BaseItemList } from '@/types/item';
import { getItemList } from '@/lib/api/item';

interface UseItemDataOptions {
  limit: number;
  offset: number;
  searchQuery: string;
  enabled: boolean;
  initialData?: BaseResponse<BaseItemList> | null; // Tambahkan initialData
}

const fetchItemAdditionalData = async (
  limit: number,
  offset: number,
  q: string
): Promise<BaseResponse<BaseItemList> | null> => {
  // Tambahkan sedikit delay untuk simulasi latency jaringan
  await new Promise(resolve => setTimeout(resolve, 300));
  const data = await getItemList({ offset, limit, q });
  return data;
};

export const useListData = ({
  limit,
  offset,
  searchQuery,
  enabled,
  initialData,
}: UseItemDataOptions) => {
  return useQuery<BaseResponse<BaseItemList> | null, Error>({
    queryKey: ["item-list", limit, offset, searchQuery],
    queryFn: () =>
      fetchItemAdditionalData(limit, offset, searchQuery),
    enabled: enabled,
    initialData: initialData || undefined, // Pastikan undefined jika null
  });
};