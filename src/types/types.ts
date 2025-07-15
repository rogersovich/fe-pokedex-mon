export interface TBaseType {
  count: number;
  next: string | null;
  previous: string | null;
  items: TType[];
}

export interface TType { 
  id: number;
  name: string;
  url: string;
}