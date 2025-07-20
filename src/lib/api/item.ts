import { apiFetch } from "./base";
import type { BaseResponse } from "@/types/base";
import type { BaseItemDetail, BaseItemList } from "@/types/item";

export interface GetItemListOptions {
  offset?: number;
  limit?: number;
  category?: string;
  q?: string;
}

export async function getItemList(
  options?: GetItemListOptions
): Promise<BaseResponse<BaseItemList>> {
  // Pass offset and limit as query parameters
  const params: Record<string, string | number> = {};
  if (options?.offset !== undefined) {
    params.offset = options.offset;
  }
  if (options?.limit !== undefined) {
    params.limit = options.limit;
  }
  if (options?.category) {
    params.category = options.category;
  }
  if (options?.q) {
    params.q = options.q;
  }

  return apiFetch<BaseResponse<BaseItemList>>("/item", {
    params,
  });
}


export async function getItem(name: string) {
  return apiFetch<BaseResponse<BaseItemDetail>>(`/item/${name}`);
}