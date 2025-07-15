export interface BaseResponse<T> {
  data : T;
  error: string | null;
  message: string;
  status: string;
}

export interface TRequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>; // For query parameters
}