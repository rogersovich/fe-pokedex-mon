import type {
  TBaseEffectEntries,
  TBaseFlavourText,
  TBaseNames,
  TBaseResource,
  TDetailNavigation,
} from "./base";

export interface BaseItemList {
  count: number;
  next: string | null;
  prev: string | null;
  items: ItemList[];
}

export interface ItemList {
  id: number;
  name: string;
  url: string;
}

export interface BaseItemDetail {
  next: TDetailNavigation | null;
  prev: TDetailNavigation | null;
  item: TItemDetailResponse;
}

export interface TItemDetailResponse {
  id: number;
  name: string;
  names: TBaseNames[];
  cost: number;
  attributes: TBaseResource[];
  category: TBaseResource;
  baby_trigger_for: any;
  effect_entries: TBaseEffectEntries[];
  flavor_text_entries: TBaseFlavourText[];
  fling_effect: any;
  fling_power: number;
  game_indicies: any;
  held_by_pokemon: any[];
  machine: any;
  sprites: {
    default: string;
  };
}
