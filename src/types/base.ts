export interface BaseResponse<T> {
  data : T;
  error: string | null;
  message: string;
  status: string;
}

export interface TRequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>; // For query parameters
}

export interface TDetailNavigation {
  id: number;
  name: string;
  url: string;
}

export interface TBaseNames {
  language: {
    name: string;
    url: string;
  };
  name: string;
}

export interface TBaseResource {
  name: string;
  url: string;
}

export interface TBaseEffectEntries {
  effect: string;
  language: TBaseResource;
  short_effect: string;
}

export interface TBaseFlavourText {
  effect: string;
  language: TBaseResource;
  version_group: TBaseResource;
}