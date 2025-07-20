import { useState, useEffect, useRef } from 'react';
import type { BaseResponse } from "@/types/base";
import type { BaseItemList } from '@/types/item';

interface UseCombinedItemDataProps {
  itemDataSSR: BaseResponse<BaseItemList> | null;
  itemDataQuery: BaseResponse<BaseItemList> | null | undefined;
  isFetching: boolean; // Dari useQuery
  isQueryEnabled: boolean; // Dari parent component
  isSearching: boolean
}

export const useCombinedItemnData = ({
  itemDataSSR,
  itemDataQuery,
  isFetching,
  isQueryEnabled,
  isSearching,
}: UseCombinedItemDataProps) => {
  const [fullCombineItemData, setFullCombineItemData] = useState<BaseResponse<BaseItemList> | null>(
    itemDataSSR
  );
  const [hasMoreData, setHasMoreData] = useState(true);
  const isInitialLoadCompleteRef = useRef(false);

  useEffect(() => {
    // Initial load with SSR data
    if (!isInitialLoadCompleteRef.current && itemDataSSR) {
      setFullCombineItemData(itemDataSSR);
      setHasMoreData(!!itemDataSSR.data.next);
      isInitialLoadCompleteRef.current = true;
      return;
    }

    // Process data from useQuery after fetch completes and if query is enabled
    if (itemDataQuery && !isFetching && isQueryEnabled) {
      setFullCombineItemData((prevData) => {
        // --- NEW: Handle Search Scenario ---
        if (isSearching) {
          return itemDataQuery;
        }

        if (!prevData || prevData.data.items.length === 0) return itemDataQuery;

        // Filter out duplicates (assuming 'name' is unique identifier)
        const newResults = itemDataQuery.data.items.filter(
          (newData) =>
            !prevData.data.items.some((oldData) => oldData.name === newData.name)
        );

        return {
          ...prevData,
          data: {
            ...prevData.data,
            items: [...prevData.data.items, ...newResults],
            count: itemDataQuery.data.count // Always take the latest total count from API
          },
        };
      });

      // Update hasMoreData based on the latest query result
      setHasMoreData(!!itemDataQuery.data.next);
    }
  }, [itemDataQuery, itemDataSSR, isFetching, isQueryEnabled]);

  return { fullCombineItemData, hasMoreData, isInitialLoadCompleteRef, setHasMoreData, setFullCombineItemData };
};