# Turso Database Migrations with Docker

This document explains how Prisma migrations are applied to Turso databases in the Docker deployment workflow.

## Background

Unlike traditional databases, Turso doesn't support `prisma migrate deploy` directly. Instead, migrations must be applied using the Turso CLI with the `turso db shell` command.

## How It Works

### 1. Local Development

When developing locally, create migrations as usual:

```bash
npx prisma migrate dev --name your_migration_name
```

This generates migration files in `packages/database/prisma/migrations/`.

### 2. Docker Build Process

The Dockerfile handles migrations in three stages:

#### Builder Stage
- Prunes the monorepo for the web app
- No migration work happens here

#### Installer Stage
- Installs dependencies
- Builds the application
- **Does NOT run `prisma migrate deploy`** (removed because it doesn't work with Turso)

#### Runner Stage
- Installs Turso CLI
- Copies the migration script from `scripts/apply-migrations.js`
- The migration script:
  - Finds all migration files in `packages/database/prisma/migrations/`
  - Applies them in order to the Turso database
  - Uses the Turso CLI: `turso db shell <db-name> < migration.sql`

### 3. Container Startup

When the container starts, it:
1. Runs `node scripts/apply-migrations.js` to apply all pending migrations
2. Starts the Node.js application with `npm run start`

## Environment Variables

The migration script uses these environment variables:

- **`RAILWAY_ENVIRONMENT_NAME`**: Railway environment name (`development` or `production`)
  - Used to construct the database name as `{environment}-tekbreed`
  - Examples: `development-tekbreed`, `production-tekbreed`
  - Default: `production`

- **`TURSO_AUTH_TOKEN`** (optional): Authentication token for Turso
  - Required if your database requires authentication
  - Get it with: `turso db tokens create <database-name>`

- **`TURSO_DATABASE_URL`**: Your Turso database URL (used by the app)
  - Get it with: `turso db show --url <database-name>`

### Database Naming Convention

The script automatically constructs the database name based on the environment:

| Environment | Database Name |
|------------|---------------|
| `development` | `development-tekbreed` |
| `production` | `production-tekbreed` |

This ensures migrations are applied to the correct database for each environment.

## Migration Script Details

The migration script is located at `scripts/apply-migrations.js` and is written in Node.js for better maintainability and error handling.

Key features:
- ✅ Automatic discovery of migration files
- ✅ Sorted execution by timestamp
- ✅ Clear logging with emojis for better visibility
- ✅ Proper error handling
- ✅ Graceful handling of missing migrations directory

### Running Migrations Locally

You can test the migration script locally before deploying:

```bash
# Make sure you have the Turso CLI installed
curl -sSfL https://get.tur.so/install.sh | bash

# Set environment variables
export RAILWAY_ENVIRONMENT_NAME="development"  # or "production"
export TURSO_AUTH_TOKEN="your-auth-token"

# Run the migration script directly
node ../../packages/database/scripts/apply-migrations.js

# Or use the npm script (from apps/web directory)
npm run migrate:turso
```

The script will automatically construct the database name as `{environment}-tekbreed` based on the `RAILWAY_ENVIRONMENT_NAME`.

## Important Notes

### Migration Idempotency

⚠️ **Warning**: The current implementation applies ALL migrations every time the container starts. This means:

- Migrations should be idempotent (safe to run multiple times)
- Or you need to implement a migration tracking system

### Alternative Approach: Migration Tracking

For production, consider tracking applied migrations:

1. Create a `_prisma_migrations` table in Turso
2. Check which migrations have been applied before running them
3. Only apply new migrations

Example enhancement:

```bash
# Check if migration was already applied
APPLIED=$(turso db shell "$DB_NAME" "SELECT migration_name FROM _prisma_migrations WHERE migration_name='$migration_name'")

if [ -z "$APPLIED" ]; then
  echo "Applying migration: $migration_name"
  turso db shell "$DB_NAME" < "$migration_file"
  turso db shell "$DB_NAME" "INSERT INTO _prisma_migrations (migration_name, applied_at) VALUES ('$migration_name', datetime('now'))"
else
  echo "Migration already applied: $migration_name"
fi
```

## Deployment Workflow

1. **Develop locally**: Create and test migrations with `prisma migrate dev`
2. **Commit migrations**: Push migration files to your repository
3. **Build Docker image**: Migrations are copied into the image
4. **Deploy container**: Migrations run automatically on startup
5. **Application starts**: Once migrations complete successfully

## Troubleshooting

### Migrations fail on startup

Check the container logs:
```bash
docker logs <container-id>
```

Look for migration error messages from the `apply-migrations.sh` script.

### Authentication errors

Ensure `TURSO_AUTH_TOKEN` is set correctly:
```bash
turso db tokens create <database-name>
```

### Database not found

Verify `TURSO_DB_NAME` matches your actual database name:
```bash
turso db list
```

## References

- [Turso Prisma Documentation](https://docs.turso.tech/sdk/ts/orm/prisma)
- [Prisma Turso Guide](https://www.prisma.io/docs/orm/overview/databases/turso#how-to-manage-schema-changes)
