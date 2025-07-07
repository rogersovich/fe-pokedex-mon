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

export interface TPokemonDetailResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: TSprites;
  types: PokemonType[];
  stats: TStat[];
  abilities: TAbility[];
  evolution: TEvolution[];
  grouped_moves: TGroupedMove[];
  order: number;
  habitat: string;
  thumbnail: string;
  training: TTraining;
  breeding: TBreeding;
  other_names: {
    language: string;
    name: string;
  }[];
}

export interface TSprites {
  front_default: string;
  other: {
    dream_world: {
      front_default: string;
      front_female: string;
    };
    home: {
      front_default: string;
      front_female: string;
      front_shiny: string;
      front_shiny_female: string;
    };
    "official-artwork": {
      front_default: string;
      front_shiny: string;
    };
    showdown: {
      back_default: string;
      back_female: string;
      back_shiny: string;
      back_shiny_female: string;
      front_default: string;
      front_female: string;
      front_shiny: string;
      front_shiny_female: string;
    };
  };
}

export interface TStat {
  base_stat: number;
  effort: number;
  stat_name: string;
  max_stat: number;
  min_stat: number;
}

export interface TBaseResource {
  name: string;
  url: string;
}

export interface TAbility {
  ability: TBaseResource;
  is_hidden: boolean;
  slot: number;
}

export interface TBabyTriggerItem {
  name: string;
  url: string;
}

export interface TEvolutionType {
  id: number;
  name: string;
  types: PokemonType[];
}

export interface TEvolutionChain {
  is_baby: boolean;
  species: TBaseResource;
  evolution_details: any;
  evolves_to: TEvolutionChain[];
  evolution_type: TEvolutionType;
}

export interface TEvolution {
  id: number;
  baby_trigger_item: TBabyTriggerItem;
  chain: TEvolutionChain;
}

export interface TMove {
  move_name: string;
  move_url: string;
  level_learned_at: number;
  move_learn_method: string;
  order: number;
}

export interface TMoveByMethod {
  method_name: string;
  moves: TMove[];
}

export interface TGroupedMove {
  group_name: string;
  moves_by_method: TMoveByMethod[];
}

export interface TTraining {
  capture_rate: number;
  capture_rate_percent: number;
  base_experience: number;
  base_happiness: number;
  growth_rate: string;
}

export interface TBreeding {
  egg_groups: TBaseResource[];
  gender_rate: {
    male: number;
    female: number;
  };
  hatch_counter: number;
  egg_cycles: number;
}
