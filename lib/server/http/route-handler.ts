import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { ApiError } from "@/lib/server/http/api-error";

export function handleRouteError(error: unknown) {
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        error: error.message,
        detail: error.detail,
      },
      { status: error.statusCode },
    );
  }

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: "Invalid request payload",
        issues: error.flatten(),
      },
      { status: 400 },
    );
  }

  console.error("Unhandled route error", error);

  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
