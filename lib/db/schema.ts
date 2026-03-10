import type { EssenceKey, PokemonType } from "@/types/game";

export type LureType = "basic_lure" | "type_lure" | "storm_lure";

export interface UserGardenRow {
  id: string;
  user_id: string;
  slots_unlocked: number;
  last_sync_at: string;
  water_essence: number;
  fire_essence: number;
  grass_essence: number;
  electric_essence: number;
  ice_essence: number;
  bug_essence: number;
  created_at: string;
  updated_at: string;
}

export interface UserPokemonRow {
  id: string;
  user_id: string;
  pokemon_id: number;
  name: string;
  sprite_url: string;
  types: PokemonType[];
  level: number;
  base_income: number;
  is_active: boolean;
  slot_index: number | null;
  captured_at: string;
  created_at: string;
  updated_at: string;
}

export interface UserLureRow {
  id: string;
  user_id: string;
  lure_type: LureType;
  placed_at: string;
  expires_at: string;
  resolved_at: string | null;
  result_pokemon_id: string | null;
  created_at: string;
  updated_at: string;
}

export type GardenEssenceLedger = Record<EssenceKey, number>;
