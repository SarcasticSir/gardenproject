import { db } from "@/lib/db/client";
import type { UserGardenRow } from "@/lib/db/schema";

export async function ensureGardenForUser(userId: string): Promise<UserGardenRow> {
  const inserted = await db.query<UserGardenRow>(
    `
      INSERT INTO user_gardens (user_id)
      VALUES ($1)
      ON CONFLICT (user_id) DO UPDATE SET user_id = EXCLUDED.user_id
      RETURNING *
    `,
    [userId],
  );

  return inserted.rows[0];
}
