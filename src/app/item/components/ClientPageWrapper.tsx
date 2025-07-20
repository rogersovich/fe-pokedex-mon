"use client";

import type { BaseResponse } from "@/types/base";
import type { BaseItemList } from "@/types/item";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ItemTable from "./ItemTable";
import { useListData } from "@/hooks/useItemData";
import { useCombinedItemnData } from "@/hooks/useCombinedItemData";
import { useSearchStore } from "@/stores/search-store";

interface ClientPageWrapperProps {
  itemDataSSR: BaseResponse<BaseItemList> | null;
  itemError: string | null;
}

export default function ClientPageWrapper({
  itemDataSSR,
}: ClientPageWrapperProps) {
  const searchStore = useSearchStore();
  const [limitParam, setLimitParam] = useState(50);
  const [offsetParam, setOffsetParam] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);

  // Ref untuk mencegah pemanggilan load more berulang
  const isLoadInProgressRef = useRef(false);

  // --- Menggunakan useListData hook ---
  const {
    data: itemDataQuery,
    isLoading,
    isError,
    error,
    isFetching,
  } = useListData({
    limit: limitParam,
    offset: offsetParam,
    searchQuery: searchQuery,
    enabled: isQueryEnabled,
    initialData: itemDataSSR,
  });

  // --- Menggunakan useCombinedItemnData hook ---
  const { fullCombineItemData, hasMoreData } = useCombinedItemnData({
    itemDataSSR: itemDataSSR,
    itemDataQuery: itemDataQuery,
    isFetching: isFetching,
    isQueryEnabled: isQueryEnabled,
    isSearching,
  });

  // --- NEW: useEffect untuk mereset isLoadInProgressRef.current ---
  useEffect(() => {
    // Ketika isFetching berubah dari true ke false (fetch selesai), reset flag
    if (!isFetching && isLoadInProgressRef.current) {
      isLoadInProgressRef.current = false;

      // NEW: Reset isSearching
      if (isSearching) {
        setIsSearching(false);
      }
    } else if (!isFetching) {
      // NEW: Reset isSearching
      if (isSearching) {
        setIsSearching(false);
      }
    }
  }, [isFetching]); // Bergantung pada isFetching

  const handleLoadMore = useCallback(() => {
    if (
      !hasMoreData ||
      isFetching ||
      isLoadInProgressRef.current ||
      isLoading
    ) {
      return;
    }

    if (!isQueryEnabled) setIsQueryEnabled(true);

    const nextOffset = offsetParam + limitParam;

    isLoadInProgressRef.current = true; // Set flag immediately
    setOffsetParam(nextOffset); // Ini akan memicu useQuery
    searchStore.offset = nextOffset; // Update store
  }, [
    offsetParam,
    limitParam,
    hasMoreData,
    isFetching,
    isQueryEnabled,
    isLoading,
    searchStore,
  ]);

  return (
    <div>
      {fullCombineItemData?.data.items && (
        <ItemTable
          items={fullCombineItemData?.data.items}
          onTriggerLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
}
