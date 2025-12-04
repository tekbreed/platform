# @repo/database

Shared database layer for TekBreed Platform, using Prisma ORM with Turso (SQLite).

## 📦 Overview

This package provides the database schema, Prisma client, and database utilities used across all apps in the monorepo. It uses Prisma ORM with Turso as the database provider.

## 🎯 What's Included

- Prisma schema definitions
- Generated Prisma client
- Database utilities and helpers
- Migration scripts
- Seed data

## 📥 Installation

This package is automatically available in the monorepo workspace. Import the Prisma client in your app:

```tsx
import { db } from "@repo/database"

// Use the Prisma client
const users = await db.user.findMany()
```

## 🔧 Development

**All commands should be run from the monorepo root.**

### Generate Prisma Client

After schema changes:

```bash
turbo database#db:generate
```

### Database Migrations

```bash
# Create a new migration
turbo database#db:migrate

# Reset database (WARNING: deletes all data)
turbo database#db:reset

# Deploy migrations to production
turbo database#db:deploy
```

### Seed Database

```bash
turbo database#db:seed
```

### Prisma Studio

Open Prisma Studio to view and edit data:

```bash
turbo database#db:studio
```

## 📁 Package Structure

```
packages/database/
├── prisma/
│   ├── schema/           # Prisma schema files
│   │   ├── user.prisma
│   │   ├── article.prisma
│   │   └── ...
│   ├── migrations/       # Database migrations
│   └── seed.ts           # Seed data
├── src/
│   ├── generated/        # Generated Prisma client
│   └── index.ts          # Database exports
├── prisma.config.ts      # Prisma configuration
└── package.json
```

## 🎯 Exports

```json
{
  ".": "./src/index.ts"
}
```

## 📚 Available Scripts

| Command | Description |
|---------|-------------|
| `turbo database#db:generate` | Generate Prisma client |
| `turbo database#db:migrate` | Create and apply migrations |
| `turbo database#db:reset` | Reset database (deletes all data) |
| `turbo database#db:deploy` | Deploy migrations to production |
| `turbo database#db:seed` | Seed database with initial data |
| `turbo database#db:studio` | Open Prisma Studio |

## 🗄️ Database Provider

- **Turso**: SQLite-compatible edge database
- **Prisma**: Type-safe ORM
- **LibSQL**: Turso adapter for Prisma

## 📚 Key Dependencies

- **@prisma/client**: ^7.0.0 - Prisma client
- **@prisma/adapter-libsql**: ^7.0.0 - Turso adapter
- **prisma**: ^7.0.0 - Prisma CLI

## 🔗 Usage Example

```tsx
import { db } from "@repo/database"

// Find all users
const users = await db.user.findMany()

// Create a new user
const newUser = await db.user.create({
  data: {
    email: "user@example.com",
    name: "John Doe"
  }
})

// Update a user
await db.user.update({
  where: { id: userId },
  data: { name: "Jane Doe" }
})

// Delete a user
await db.user.delete({
  where: { id: userId }
})
```

## 🔗 Related Documentation

- [Root README](../../README.md)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Turso Documentation](https://docs.turso.tech/)
