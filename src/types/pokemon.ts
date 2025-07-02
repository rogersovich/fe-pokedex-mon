export interface PokemonList {
  id: number;
  name: string;
  url: string;
  thumbnail: string;
  types: PokemonType[];
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

