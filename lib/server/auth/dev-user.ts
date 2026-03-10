import type { NextRequest } from "next/server";

const DEV_USER_ID_HEADER = "x-dev-user-id";
const DEV_DEFAULT_USER_ID = "dev-user-001";

export function resolveUserId(request: NextRequest): string {
  const headerUserId = request.headers.get(DEV_USER_ID_HEADER);
  const searchUserId = request.nextUrl.searchParams.get("userId");

  return headerUserId ?? searchUserId ?? DEV_DEFAULT_USER_ID;
}
