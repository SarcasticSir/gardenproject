export const ESSENCE_KEYS = [
  "water_essence",
  "fire_essence",
  "grass_essence",
  "electric_essence",
  "ice_essence",
  "bug_essence",
] as const;

export type EssenceKey = (typeof ESSENCE_KEYS)[number];

export type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

export type WeatherKey =
  | "rain"
  | "clear"
  | "clouds"
  | "snow"
  | "thunderstorm"
  | "mist"
  | "unknown";

export type WeatherMultipliers = Partial<Record<PokemonType, number>>;

export interface GardenWeatherModel {
  weatherKey: WeatherKey;
  boostedTypes: PokemonType[];
  multipliers: WeatherMultipliers;
  source: {
    location: string;
    temperatureCelsius: number;
    condition: string;
    observedAt: string;
  };
}
