# Turso Database Migrations

This document explains how Prisma migrations are applied to Turso databases in our deployment workflow.

## Background

Unlike traditional databases, Turso doesn't support `prisma migrate deploy` directly in all environments. We use a custom Node.js script to apply migrations using the `@libsql/client`.

## How It Works

### 1. Local Development

When developing locally, create migrations as usual:

```bash
npx prisma migrate dev --name your_migration_name
```

This generates migration files in `packages/database/prisma/migrations/`.

### 2. Deployment Process

The migration process is handled by a custom script: `packages/database/scripts/apply-migrations.js`.

#### The Migration Script
- Uses `@libsql/client` to connect to the Turso database.
- Reads all migration folders from `packages/database/prisma/migrations/`.
- Executes the `migration.sql` file from each folder.
- Uses `client.executeMultiple(sql)` to run the entire migration file.
- **Idempotency**: The script catches "already exists" errors (e.g., table or index already exists) and treats them as success. This allows the script to run safely on every deployment, even if migrations have already been applied.

### 3. Container Startup

When the application container starts (or during the build process depending on configuration), it runs:

```bash
node scripts/apply-migrations.js
```

## Environment Variables

The migration script relies on the following environment variables:

- **`TURSO_DATABASE_URL`**: The connection URL for the Turso database (e.g., `libsql://...`).
- **`TURSO_AUTH_TOKEN`**: The authentication token for the Turso database.
- **`RAILWAY_ENVIRONMENT_NAME`**: (Optional) Used for logging purposes to indicate the current environment.

## Migration Script Details

The script is located at `scripts/apply-migrations.js`.

Key features:
- ✅ **Batch Execution**: Uses `client.executeMultiple()` for efficient execution of migration SQL.
- ✅ **Idempotency**: Gracefully handles "already exists" errors, allowing re-runs without failure.
- ✅ **Automatic Discovery**: Finds and applies all migrations in the `prisma/migrations` directory.

### Running Migrations Locally

You can run the migration script locally to test it:

```bash
# Set environment variables
export TURSO_DATABASE_URL="libsql://your-db-url"
export TURSO_AUTH_TOKEN="your-auth-token"

# Run the script
node packages/database/scripts/apply-migrations.js
```

## Troubleshooting

### Migrations fail with "already exists"

The script is designed to ignore these errors. If you see them in the logs as warnings, it is expected behavior for re-runs. If the migration fails with a different error, check the SQL syntax or connection issues.

### Authentication errors

Ensure `TURSO_AUTH_TOKEN` is set correctly and corresponds to the database specified in `TURSO_DATABASE_URL`.

## References

- [Turso Documentation](https://docs.turso.tech/)
- [Prisma Turso Guide](https://www.prisma.io/docs/orm/overview/databases/turso)
