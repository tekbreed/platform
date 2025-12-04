
// /**
//  * Apply Prisma migrations to Turso database
//  * 
//  * This script reads all migration files from the Prisma migrations directory
//  * and applies them to the Turso database using the Turso CLI.
//  * 
//  * Environment Variables:
//  * - RAILWAY_ENVIRONMENT_NAME: Railway environment (development or production)
//  * - TURSO_AUTH_TOKEN: Authentication token for Turso (optional)
//  */

// import { execSync } from 'node:child_process';
// import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
// import { fileURLToPath } from 'node:url';
// import { join, resolve, basename, dirname } from 'node:path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const DEFAULT_ENVIRONMENT = 'development';
// const MIGRATIONS_DIR = "./packages/database/prisma/migrations"

// /**
//  * Construct the database name based on the environment
//  * Format: {environment}-tekbreed
//  * Examples: development-tekbreed, production-tekbreed
//  */
// function getDbName() {
//   const environment = process.env.RAILWAY_ENVIRONMENT_NAME ?? DEFAULT_ENVIRONMENT;
//   return environment;
// }

// const DB_NAME = getDbName();

// /**
//  * Execute a shell command and return the output
//  */
// function exec(command, options = {}) {
//   try {
//     return execSync(command, {
//       encoding: 'utf8',
//       stdio: options.silent ? 'pipe' : 'inherit',
//       ...options,
//     });
//   } catch (error) {
//     console.error(`Error executing command: ${command}`);
//     throw error;
//   }
// }

// /**
//  * Get all migration directories sorted by timestamp
//  */
// function getMigrationDirs() {
//   if (!existsSync(MIGRATIONS_DIR)) {
//     console.log('No migrations directory found, skipping migrations');
//     return [];
//   }

//   const entries = readdirSync(MIGRATIONS_DIR);
  
//   return entries
//     .map(entry => join(MIGRATIONS_DIR, entry))
//     .filter(path => statSync(path).isDirectory())
//     .sort(); // Migrations are named with timestamps, so alphabetical sort works
// }

// /**
//  * Apply a single migration to Turso
//  */
// function applyMigration(migrationDir) {
//   const migrationFile = join(migrationDir, 'migration.sql');
  
//   if (!existsSync(migrationFile)) {
//     console.warn(`⚠️  No migration.sql found in ${migrationDir}`);
//     return false;
//   }

//   const migrationName = basename(migrationDir);
//   console.log(`📦 Applying migration: ${migrationName}`);

//   try {
//     // Read the migration SQL
//     const sql = readFileSync(migrationFile, 'utf8');
    
//     // Apply to Turso using the CLI
//     exec(`turso db shell "${DB_NAME}" < "${migrationFile}"`);
    
//     console.log(`✅ Successfully applied: ${migrationName}`);
//     return true;
//   } catch (error) {
//     console.error(`❌ Failed to apply migration: ${migrationName}`);
//     throw error;
//   }
// }

// /**
//  * Main function
//  */
// async function main() {
//   const environment = process.env.RAILWAY_ENVIRONMENT_NAME ?? DEFAULT_ENVIRONMENT;
  
//   console.log('🚀 Starting Turso migration process...\n');
//   console.log(`Environment: ${environment}`);
//   console.log(`Database: ${DB_NAME}`);
//   console.log(`Migrations directory: ${MIGRATIONS_DIR}\n`);

//   // Get all migration directories
//   const migrationDirs = getMigrationDirs();

//   if (migrationDirs.length === 0) {
//     console.log('✨ No migrations to apply');
//     return;
//   }

//   console.log(`Found ${migrationDirs.length} migration(s)\n`);

//   // Apply each migration in order
//   let appliedCount = 0;
//   for (const migrationDir of migrationDirs) {
//     if (applyMigration(migrationDir)) {
//       appliedCount++;
//     }
//   }

//   console.log(`\n✨ Migration process complete! Applied ${appliedCount}/${migrationDirs.length} migration(s)`);
// }

// // Run main script to apply migrations
// main().catch(error => {
//   console.error('\n❌ Migration failed:', error.message);
//   process.exit(1);
// });



/**
 * Apply Prisma migrations to a Turso (libSQL) database
 *
 * This script:
 *  - Logs in the Turso CLI using TURSO_AUTH_TOKEN
 *  - Reads migration.sql files from Prisma's migration folder
 *  - Sends them to Turso using "turso db shell"
 *
 * Environment Variables:
 * - RAILWAY_ENVIRONMENT_NAME: environment name (development, production, etc.)
 * - TURSO_AUTH_TOKEN: Turso authentication token (required)
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
  process.exit(1);
}

/**
 * Authenticate Turso CLI using token
 */
function loginTurso() {
  console.log("🔑 Logging in to Turso CLI...");
  const result = spawnSync('turso', ['auth', 'login', '--token', process.env.TURSO_AUTH_TOKEN], {
    stdio: 'inherit',
    env: process.env,
  });

  if (result.status !== 0) {
    console.error("❌ Turso CLI login failed. Check your TURSO_AUTH_TOKEN.");
    process.exit(1);
  }
}

/**
 * Execute turso command piping SQL via STDIN
 */
function tursoShell(sql) {
  const proc = spawnSync(
    "turso",
    ["db", "shell", DB_NAME],
    {
      input: sql,
      encoding: "utf8",
      stdio: ["pipe", "inherit", "inherit"],
      env: {
        ...process.env,
        TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN
      }
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
  loginTurso(); // <-- Authenticate first

  const environment = process.env.RAILWAY_ENVIRONMENT_NAME ?? DEFAULT_ENVIRONMENT;

  console.log("🚀 Starting Turso migration process...\n");
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
