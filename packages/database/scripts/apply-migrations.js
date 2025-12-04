/**
 * Apply Prisma migrations to a Turso (libSQL) database,
 * then start the main application.
 *
 * Environment Variables:
 * - RAILWAY_ENVIRONMENT_NAME
 * - TURSO_AUTH_TOKEN
 * - TURSO_DATABASE_URL
 * - NODE_ENV
 * - PORT
 */

import { spawnSync } from 'node:child_process';
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname, basename } from 'node:path';

const DEFAULT_ENVIRONMENT = 'development';
const MIGRATIONS_DIR = "./packages/database/prisma/migrations";

/**
 * Load & validate environment variables
 */
function loadEnv() {
  const required = ["TURSO_AUTH_TOKEN", "TURSO_DATABASE_URL"];
  for (const key of required) {
    if (!process.env[key]) {
      console.error(`❌ Missing required environment variable: ${key}`);
      process.exit(1);
    }
  }

  console.log("🔧 Loaded environment variables:");
  console.log(" - RAILWAY_ENVIRONMENT_NAME:", process.env.RAILWAY_ENVIRONMENT_NAME);
  console.log(" - NODE_ENV:", process.env.NODE_ENV);
  console.log(" - PORT:", process.env.PORT);
  console.log(" - TURSO_DATABASE_URL:", process.env.TURSO_DATABASE_URL ? "[SET]" : "[NOT SET]");
}

/**
 * Get database name
 */
function getDbName() {
  return process.env.RAILWAY_ENVIRONMENT_NAME ?? DEFAULT_ENVIRONMENT;
}
const DB_NAME = getDbName();

/**
 * Execute turso shell with SQL
 */
function tursoShell(sql) {
  const proc = spawnSync(
    "turso",
    ["db", "shell", DB_NAME],
    {
      input: sql,
      encoding: "utf8",
      stdio: ["pipe", "inherit", "inherit"],
      env: process.env,
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
    console.warn(`⚠️ No migration.sql found in ${migrationDir}`);
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
 * Start the main application
 */
function startApplication() {
  console.log("\n🚀 Starting application (npm run start)...\n");

  const proc = spawnSync("npm", ["run", "start"], {
    stdio: "inherit",
    env: process.env,
  });

  if (proc.status !== 0) {
    console.error("\n❌ Application failed to start.");
    process.exit(proc.status);
  }
}

/**
 * Main entry
 */
async function main() {
  loadEnv();

  console.log("\n🚀 Starting Turso migration process...");
  console.log(`Environment: ${process.env.RAILWAY_ENVIRONMENT_NAME ?? DEFAULT_ENVIRONMENT}`);
  console.log(`Database: ${DB_NAME}`);
  console.log(`Migrations directory: ${MIGRATIONS_DIR}\n`);

  const migrationDirs = getMigrationDirs();

  if (migrationDirs.length === 0) {
    console.log("✨ No migrations to apply\n");
    return startApplication();
  }

  console.log(`Found ${migrationDirs.length} migration(s)\n`);

  let appliedCount = 0;
  for (const dir of migrationDirs) {
    if (applyMigration(dir)) appliedCount++;
  }

  console.log(`\n✨ Done! Applied ${appliedCount}/${migrationDirs.length} migration(s)\n`);

  // ⏩ Start application after successful migrations
  startApplication();
}

main().catch(err => {
  console.error("\n❌ Migration failed:", err.message);
  process.exit(1);
});
