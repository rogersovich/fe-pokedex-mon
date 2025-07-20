"use client";

import type { BaseResponse } from "@/types/base";
import type { BaseItemList } from "@/types/item";
import React from "react";
import ItemTable from "./ItemTable";

interface ClientPageWrapperProps {
  itemDataSSR: BaseResponse<BaseItemList> | null;
  itemError: string | null;
}

export default function ClientPageWrapper({
  itemDataSSR,
}: ClientPageWrapperProps) {
  return (
    <div>
      {itemDataSSR?.data.items && <ItemTable items={itemDataSSR?.data.items} />}
    </div>
  );
}
