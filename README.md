# TekBreed Platform

A modern monorepo platform built with cutting-edge web technologies, featuring multiple applications and shared packages for scalable development.

## 🏗️ Project Structure

This is a monorepo managed with [Turborepo](https://turbo.build/repo) and npm workspaces.

```
platform/
├── apps/
│   ├── web/          # Main web application (React Router v7)
│   ├── cms/          # Content management system (Sanity Studio)
│   ├── waitlist/     # Waitlist application
│   └── ...           # Other applications
├── packages/
│   ├── database/     # Shared database layer (Prisma + Turso)
│   ├── ui/           # Shared UI components (React + Tailwind CSS)
│   ├── utils/        # Shared utilities and helpers
│   ├── base-config/  # Shared configuration
│   ├── tests-config/ # Shared testing configuration
│   └── typescript-config/ # Shared TypeScript configuration
└── docs/             # Documentation
```

## 🚀 Quick Start

### Prerequisites

- **Node.js**: >= 22.0.0
- **npm**: 11.5.1 (specified in `packageManager`)
- **Git**: Latest version

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file for the web app:
   ```bash
   cp apps/web/.env.example apps/web/.env
   ```
   
   Update the `.env` file with your actual values. See [Environment Variables](#environment-variables) for details.

4. **Generate database client**
   ```bash
   npm run db:generate
   ```

5. **Start development servers**
   
   **Run all commands from the monorepo root using Turborepo.**
   
   Start all apps:
   ```bash
   npm run dev
   ```
   
   Or start a specific app:
   ```bash
   turbo <app-name>#dev
   # Examples:
   turbo web#dev
   turbo cms#dev
   ```
   
   > [!NOTE]
   > When starting an app, Turborepo automatically starts its dependencies first. For example, `turbo web#dev` will start the CMS app first (as defined in `turbo.json`), then start the web app.
   
   The web app will be available at `http://localhost:5173` (or the port specified in your `.env`).

## 📦 Available Scripts

### Root Level Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start all apps in development mode |
| `npm run build` | Build all apps for production |
| `npm run test` | Run unit tests in watch mode |
| `npm run test:run` | Run unit tests once with coverage |
| `npm run test:e2e` | Run e2e tests for all apps |
| `npm run test:e2e:run` | Run e2e tests in CI mode |
| `npm run test:e2e:ui` | Open Playwright UI for e2e tests |
| `npm run test:e2e:report` | Show e2e test reports |
| `npm run test:e2e:install` | Install Playwright browsers |
| `npm run format-and-lint` | Check code formatting and linting |
| `npm run format-and-lint:fix` | Fix code formatting and linting issues |
| `npm run typecheck` | Run TypeScript type checking |

### Turbo Commands

**All commands should be run from the monorepo root.**

Run commands for specific apps or packages:

```bash
# Development
turbo <app-name>#dev       # Start specific app dev server
turbo web#dev              # Example: Start web app
turbo cms#dev              # Example: Start CMS

# Building
turbo <app-name>#build     # Build specific app
turbo web#build            # Example: Build web app
turbo build --filter=<app> # Alternative: Filter syntax

# Testing
turbo test                 # Run all unit tests (watch mode)
turbo test:run             # Run unit tests once (CI mode)
turbo test:e2e             # Run all e2e tests
turbo test:e2e --filter=<app>  # Run e2e tests for specific app

# Linting & Formatting
turbo format-and-lint      # Check all packages
turbo format-and-lint:fix  # Auto-fix issues
```

> [!IMPORTANT]
> **Dependency Management**: Turborepo automatically handles app dependencies. When you run `turbo web#dev`, it will first start the CMS app (as web depends on it), then start the web app. This is configured in `turbo.json` under the `dev` task's `with` property.

## 🔧 Environment Variables

The platform uses various environment variables for configuration. Key variables include:

- **Content Management**: Sanity Studio configuration
- **Authentication**: Session secrets, OAuth credentials
- **Database**: Turso database URL and auth token
- **AI Services**: Anthropic and Voyage API keys
- **Email**: Resend API configuration
- **Storage**: Bunny CDN configuration
- **Payments**: Polar subscription management

See [`apps/web/.env.example`](./apps/web/.env.example) for a complete list with descriptions.

## 🏛️ Architecture

### Technology Stack

- **Frontend**: React 19, React Router v7, Tailwind CSS v4
- **Backend**: React Router (SSR), Node.js
- **Database**: Prisma ORM with Turso (SQLite)
- **CMS**: Sanity.io
- **Authentication**: Custom auth with OAuth (GitHub)
- **Testing**: Vitest (unit), Playwright (e2e)
- **Code Quality**: Biome (linting & formatting)
- **Monorepo**: Turborepo
- **Package Manager**: npm workspaces

### Apps

- **[web](./apps/web/README.md)**: Main web application - the primary user-facing platform
- **cms**: Sanity Studio for content management
- **waitlist**: Waitlist management application

### Shared Packages

- **@repo/database**: Prisma schema and database utilities
- **@repo/ui**: Reusable React components with Tailwind CSS
- **@repo/utils**: Shared utility functions and helpers
- **@repo/base-config**: Base React Router configuration and shared app settings
- **@repo/tests-config**: Shared testing utilities and fixtures
- **@repo/typescript-config**: Shared TypeScript configurations

## 🧪 Testing

### Unit Tests

Unit tests are written with Vitest and can be run at the root level:

```bash
# Watch mode
npm run test

# Run once with coverage
npm run test:run
```

### E2E Tests

End-to-end tests use Playwright:

```bash
# Run e2e tests
npm run test:e2e

# Run in CI mode
npm run test:e2e:run

# Open Playwright UI
npm run test:e2e:ui

# View test report
npm run test:e2e:report
```

## 🤝 Contributing

We welcome contributions! Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) for details on:

- Code of conduct
- Development workflow
- Code style guidelines
- Testing requirements
- Pull request process

## 📝 License

[Add your license information here]

## 🔗 Links

- [Web App Documentation](./apps/web/README.md)
- [Contributing Guidelines](./CONTRIBUTING.md)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [React Router Documentation](https://reactrouter.com/)

## 💬 Support

[Discord Server](https://discord.gg/tekbreed)