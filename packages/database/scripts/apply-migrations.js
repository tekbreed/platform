/**
 * Apply migrations to a Turso (libSQL) database using @libsql/client
 *
 * This script:
 * - Reads migration.sql files from Prisma's migrations folder
 * - Executes them using the libSQL client
 *
 * Environment Variables:
 * - RAILWAY_ENVIRONMENT_NAME: environment name (development, production, etc.)
 * - TURSO_AUTH_TOKEN: Turso authentication token (required)
 * - TURSO_DATABASE_URL: Turso database URL (required)
 */

import { fileURLToPath } from "node:url";
import { join, basename, dirname } from "node:path";
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";

import { createClient } from "@libsql/client";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MIGRATIONS_DIR = join(__dirname, "../prisma/migrations");

const { TURSO_AUTH_TOKEN, RAILWAY_ENVIRONMENT_NAME, TURSO_DATABASE_URL } = process.env;

if (!TURSO_AUTH_TOKEN) {
  console.error("❌ TURSO_AUTH_TOKEN is missing. Set it in Railway or CI secrets.");
  process.exit(1);
}

if (!TURSO_DATABASE_URL) {
  console.error("❌ TURSO_DATABASE_URL is missing. Set it in Railway or CI secrets.");
  process.exit(1);
}

const client = createClient({
  url: TURSO_DATABASE_URL,
  authToken: TURSO_AUTH_TOKEN,
});

/**
 * Get sorted migration directories
 * Migrations are timestamped, so we can sort them by name
 */
function getMigrationDirs() {
  if (!existsSync(MIGRATIONS_DIR)) {
    console.log("No migrations directory found, skipping migrations.");
    return [];
  }

  return readdirSync(MIGRATIONS_DIR)
    .map((entry) => join(MIGRATIONS_DIR, entry))
    .filter((path) => statSync(path).isDirectory())
    .sort();
}

/**
 * Apply one migration
 */
async function applyMigration(migrationDir) {
  const migrationFile = join(migrationDir, "migration.sql");

  if (!existsSync(migrationFile)) {
    console.warn(`⚠️  No migration.sql found in ${migrationDir}`);
    return false;
  }

  const migrationName = basename(migrationDir);
  console.log(`📦 Applying migration: ${migrationName}`);

  const sql = readFileSync(migrationFile, "utf8");

  try {
    await client.execute(sql);
    console.log(`✅ Successfully applied: ${migrationName}`);
    return true;
  } catch (err) {
    console.error(`❌ Failed: ${migrationName}`, err);
    throw err;
  }
}

/**
 * Main entrypoint
 */
async function main() {
  const environment = process.env.RAILWAY_ENVIRONMENT_NAME;

  console.log("🚀 Starting migrations using libSQL client...");
  console.log(`Environment: ${environment}`);
  console.log(`Database URL: ${DATABASE_URL}\n`);

  const migrationDirs = getMigrationDirs();

  if (migrationDirs.length === 0) {
    console.log("✨ No migrations to apply");
    return;
  }

  console.log(`Found ${migrationDirs.length} migration(s)\n`);

  let appliedCount = 0;
  for (const dir of migrationDirs) {
    if (await applyMigration(dir)) appliedCount++;
  }

  console.log(`\n✨ Applied ${appliedCount}/${migrationDirs.length} migration(s)`);

  await client.close();
}

main().catch((err) => {
  console.error("\n❌ Migration failed:", err.message);
  process.exit(1);
});
