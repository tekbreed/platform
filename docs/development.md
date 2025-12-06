# Development Workflow

Development practices and Turborepo command reference.

## Turborepo Commands

**All commands run from monorepo root.**

### Development

```bash
# Start all apps
npm run dev

# Start specific app (Turbo handles dependencies)
turbo web#dev
turbo cms#dev
turbo admin#dev
```

### Building

```bash
# Build all apps
npm run build

# Build specific app
turbo web#build
turbo build --filter=web
```

### Testing

```bash
# Unit tests (watch mode)
npm run test

# Unit tests (CI mode)
npm run test:run

# E2E tests
npm run test:e2e
turbo test:e2e --filter=web

# Playwright UI
npm run test:e2e:ui
```

### Code Quality

```bash
# Check formatting and linting
npm run format-and-lint

# Auto-fix issues
npm run format-and-lint:fix

# Type checking
npm run typecheck
```

### Database

```bash
# Generate Prisma client
npm run db:generate

# Run migrations
turbo database#db:migrate

# Open Prisma Studio
turbo database#db:studio

# Reset database (⚠️ deletes data)
turbo database#db:reset
```

## Adding Dependencies

```bash
# To specific app
npm install <package> -w apps/<app-name>

# To specific package
npm install <package> -w packages/<package-name>

# To root (dev dependencies)
npm install <package> -D
```

## Branch Naming

```
feature/  - New features
fix/      - Bug fixes
docs/     - Documentation
refactor/ - Refactoring
test/     - Testing
chore/    - Maintenance
```

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(web): add user profile page
fix(database): resolve connection timeout
docs: update architecture diagram
```

## Pre-commit Hooks

Husky runs automatically:
- Biome format and lint check

## Pull Request Checklist

- [ ] Tests pass locally
- [ ] Code follows style guidelines
- [ ] Types are checked
- [ ] Docs updated if needed
