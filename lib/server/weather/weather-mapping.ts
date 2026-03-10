import type { GardenWeatherModel, PokemonType, WeatherKey } from "@/types/game";

interface WeatherMappingRule {
  weatherKey: WeatherKey;
  boostedTypes: PokemonType[];
  multipliers: Partial<Record<PokemonType, number>>;
}

const WEATHER_RULES: Record<string, WeatherMappingRule> = {
  Rain: {
    weatherKey: "rain",
    boostedTypes: ["water"],
    multipliers: { water: 1.8 },
  },
  Clear: {
    weatherKey: "clear",
    boostedTypes: ["grass", "fire"],
    multipliers: { grass: 1.5, fire: 1.5 },
  },
  Clouds: {
    weatherKey: "clouds",
    boostedTypes: ["electric", "flying"],
    multipliers: { electric: 1.35, flying: 1.35 },
  },
  Snow: {
    weatherKey: "snow",
    boostedTypes: ["ice"],
    multipliers: { ice: 2.1 },
  },
  Thunderstorm: {
    weatherKey: "thunderstorm",
    boostedTypes: ["electric"],
    multipliers: { electric: 2.0 },
  },
  Mist: {
    weatherKey: "mist",
    boostedTypes: ["ghost", "psychic"],
    multipliers: { ghost: 1.4, psychic: 1.4 },
  },
  Fog: {
    weatherKey: "mist",
    boostedTypes: ["ghost", "psychic"],
    multipliers: { ghost: 1.4, psychic: 1.4 },
  },
};

export interface OpenWeatherSnapshot {
  condition: string;
  location: string;
  temperatureCelsius: number;
  observedAt: string;
}

export function mapOpenWeatherToGardenModel(
  source: OpenWeatherSnapshot,
): GardenWeatherModel {
  const mapped = WEATHER_RULES[source.condition] ?? {
    weatherKey: "unknown",
    boostedTypes: [],
    multipliers: {},
  };

  return {
    weatherKey: mapped.weatherKey,
    boostedTypes: mapped.boostedTypes,
    multipliers: mapped.multipliers,
    source,
  };
}
