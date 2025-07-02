export interface BaseResponse<T> {
  results : T;
  count: number;
  next?: string;
  previous?: string;
}

export interface TRequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>; // For query parameters
}