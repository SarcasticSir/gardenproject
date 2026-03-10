import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { resolveUserId } from "@/lib/server/auth/dev-user";
import { handleRouteError } from "@/lib/server/http/route-handler";
import { getGardenWeather } from "@/lib/server/weather/weather-service";

const weatherQuerySchema = z.object({
  city: z.string().min(1).optional(),
  country: z.string().min(2).max(2).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const userId = resolveUserId(request);

    const query = weatherQuerySchema.parse({
      city: request.nextUrl.searchParams.get("city") ?? undefined,
      country: request.nextUrl.searchParams.get("country") ?? undefined,
    });

    const weather = await getGardenWeather(query);

    return NextResponse.json({
      userId,
      weather,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return handleRouteError(error);
  }
}
