import { serverEnv } from "@/lib/env/server-env";
import { ApiError } from "@/lib/server/http/api-error";
import {
  mapOpenWeatherToGardenModel,
  type OpenWeatherSnapshot,
} from "@/lib/server/weather/weather-mapping";
import type { GardenWeatherModel } from "@/types/game";

interface OpenWeatherResponse {
  name: string;
  dt: number;
  weather: Array<{ main: string }>;
  main: { temp: number };
}

const CACHE_TTL_MS = 5 * 60 * 1000;
const weatherCache = new Map<string, { expiresAt: number; value: GardenWeatherModel }>();

export interface WeatherRequestParams {
  city?: string;
  country?: string;
}

export async function getGardenWeather(
  params: WeatherRequestParams = {},
): Promise<GardenWeatherModel> {
  const city = params.city ?? serverEnv.OPENWEATHER_DEFAULT_CITY;
  const country = params.country ?? serverEnv.OPENWEATHER_DEFAULT_COUNTRY;
  const cacheKey = `${city.toLowerCase()}-${country.toLowerCase()}`;

  const cached = weatherCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.value;
  }

  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.searchParams.set("q", `${city},${country}`);
  url.searchParams.set("appid", serverEnv.OPENWEATHER_API_KEY);
  url.searchParams.set("units", "metric");

  const response = await fetch(url, {
    method: "GET",
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new ApiError("Failed to fetch weather from OpenWeather", 502, {
      status: response.status,
      statusText: response.statusText,
    });
  }

  const payload = (await response.json()) as OpenWeatherResponse;
  const condition = payload.weather[0]?.main;

  if (!condition) {
    throw new ApiError("OpenWeather response did not contain weather condition", 502);
  }

  const sourceSnapshot: OpenWeatherSnapshot = {
    condition,
    location: payload.name,
    temperatureCelsius: payload.main.temp,
    observedAt: new Date(payload.dt * 1000).toISOString(),
  };

  const gardenWeather = mapOpenWeatherToGardenModel(sourceSnapshot);

  weatherCache.set(cacheKey, {
    expiresAt: Date.now() + CACHE_TTL_MS,
    value: gardenWeather,
  });

  return gardenWeather;
}
