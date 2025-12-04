/**
 * Apply Prisma migrations to a Turso (libSQL) database
 *
 * This script:
 *  - Reads migration.sql files from Prisma's migration folder
 *  - Sends them to Turso using "turso db shell"
 *  - Relies on TURSO_AUTH_TOKEN environment variable for authentication
 *
 * Environment Variables:
 * - RAILWAY_ENVIRONMENT_NAME: environment name (development, production, etc.)
 * - TURSO_AUTH_TOKEN: Turso authentication token (required - automatically used by CLI)
 */

import { spawnSync } from 'node:child_process';
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname, basename } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DEFAULT_ENVIRONMENT = 'development';
const MIGRATIONS_DIR = "./packages/database/prisma/migrations";

/**
 * Get database name = environment
 */
function getDbName() {
  return process.env.RAILWAY_ENVIRONMENT_NAME ?? DEFAULT_ENVIRONMENT;
}

const DB_NAME = getDbName();

// Validate required environment variables
if (!process.env.TURSO_AUTH_TOKEN) {
  console.error("❌ TURSO_AUTH_TOKEN is missing. Set it in Railway or locally.");
  console.error("💡 The Turso CLI automatically uses this token - no login command needed.");
  process.exit(1);
}

/**
 * Execute turso command piping SQL via STDIN
 * The TURSO_AUTH_TOKEN env var is automatically picked up by the CLI
 */
function tursoShell(sql) {
  const proc = spawnSync(
    "turso",
    ["db", "shell", DB_NAME],
    {
      input: sql,
      encoding: "utf8",
      stdio: ["pipe", "inherit", "inherit"],
      env: process.env, // TURSO_AUTH_TOKEN is automatically used
    }
  );

  if (proc.status !== 0) {
    throw new Error(`turso db shell exited with status ${proc.status}`);
  }
}

/**
 * Get sorted migration directories
 */
function getMigrationDirs() {
  if (!existsSync(MIGRATIONS_DIR)) {
    console.log("No migrations directory found, skipping migrations.");
    return [];
  }

  return readdirSync(MIGRATIONS_DIR)
    .map(entry => join(MIGRATIONS_DIR, entry))
    .filter(path => statSync(path).isDirectory())
    .sort();
}

/**
 * Apply one migration
 */
function applyMigration(migrationDir) {
  const migrationFile = join(migrationDir, "migration.sql");

  if (!existsSync(migrationFile)) {
    console.warn(`⚠️  No migration.sql found in ${migrationDir}`);
    return false;
  }

  const migrationName = basename(migrationDir);

  console.log(`📦 Applying migration: ${migrationName}`);

  const sql = readFileSync(migrationFile, "utf8");

  try {
    tursoShell(sql);
    console.log(`✅ Successfully applied: ${migrationName}`);
    return true;
  } catch (err) {
    console.error(`❌ Failed: ${migrationName}`);
    throw err;
  }
}

/**
 * Main entry
 */
async function main() {
  const environment = process.env.RAILWAY_ENVIRONMENT_NAME ?? DEFAULT_ENVIRONMENT;

  console.log("🚀 Starting Turso migration process...");
  console.log("🔑 Using TURSO_AUTH_TOKEN from environment (auto-detected by CLI)\n");
  console.log(`Environment: ${environment}`);
  console.log(`Database: ${DB_NAME}`);
  console.log(`Migrations directory: ${MIGRATIONS_DIR}\n`);

  const migrationDirs = getMigrationDirs();

  if (migrationDirs.length === 0) {
    console.log("✨ No migrations to apply");
    return;
  }

  console.log(`Found ${migrationDirs.length} migration(s)\n`);

  let appliedCount = 0;
  for (const dir of migrationDirs) {
    if (applyMigration(dir)) appliedCount++;
  }

  console.log(`\n✨ Done! Applied ${appliedCount}/${migrationDirs.length} migration(s)`);
}

main().catch(err => {
  console.error("\n❌ Migration failed:", err.message);
  process.exit(1);
});