CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS user_gardens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE,
  water_essence NUMERIC(18,2) NOT NULL DEFAULT 0,
  fire_essence NUMERIC(18,2) NOT NULL DEFAULT 0,
  grass_essence NUMERIC(18,2) NOT NULL DEFAULT 0,
  electric_essence NUMERIC(18,2) NOT NULL DEFAULT 0,
  ice_essence NUMERIC(18,2) NOT NULL DEFAULT 0,
  bug_essence NUMERIC(18,2) NOT NULL DEFAULT 0,
  slots_unlocked INTEGER NOT NULL DEFAULT 6,
  last_sync_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_pokemon (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  pokemon_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  sprite_url TEXT NOT NULL,
  types JSONB NOT NULL,
  level INTEGER NOT NULL DEFAULT 1,
  base_income NUMERIC(12,4) NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT FALSE,
  slot_index INTEGER,
  captured_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT user_pokemon_slot_unique UNIQUE (user_id, slot_index)
);

CREATE INDEX IF NOT EXISTS idx_user_pokemon_user_id ON user_pokemon(user_id);
CREATE INDEX IF NOT EXISTS idx_user_pokemon_active ON user_pokemon(user_id, is_active);

CREATE TABLE IF NOT EXISTS user_lures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  lure_type TEXT NOT NULL CHECK (lure_type IN ('basic_lure', 'type_lure', 'storm_lure')),
  placed_at TIMESTAMPTZ NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  resolved_at TIMESTAMPTZ,
  result_pokemon_id UUID REFERENCES user_pokemon(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_lures_user_active
  ON user_lures(user_id, expires_at)
  WHERE resolved_at IS NULL;
