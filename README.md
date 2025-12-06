# TekBreed Platform

A modern monorepo platform built with cutting-edge web technologies, featuring multiple applications and shared packages for scalable development.

## 🏗️ Project Structure

This is a monorepo managed with [Turborepo](https://turbo.build/repo) and npm workspaces.

```
platform/
├── apps/
│   ├── web/                 # Main web application (React Router v7)
│   ├── cms/                 # Content management (Sanity Studio)
│   ├── admin/               # Admin dashboard
│   ├── chat/                # AI chat interface
│   ├── classroom/           # Classroom app
│   ├── coding-challenges/   # Code challenges platform
│   ├── docs/                # Documentation site
│   ├── job-board/           # Job listings
│   ├── lms/                 # Learning management system
│   ├── mcp/                 # MCP server
│   ├── notes/               # Notes application
│   ├── store/               # E-commerce store
│   ├── teams/               # Team management
│   └── apis/                # API services
├── packages/
│   ├── database/            # Shared database layer (Prisma + Turso)
│   ├── ui/                  # Shared UI components
│   ├── utils/               # Shared utilities
│   ├── base-config/         # Shared configuration
│   ├── tests-config/        # Testing configuration
│   └── typescript-config/   # TypeScript configuration
└── docs/                    # Documentation
```

## 📚 Documentation

See the [docs/](./docs/README.md) directory for:
- [Getting Started](./docs/getting-started.md)
- [Architecture](./docs/architecture.md)
- [Development](./docs/development.md)
- [Deployment](./docs/deployment.md)

## 🚀 Quick Start

### Prerequisites

- **Node.js**: >= 22.0.0
- **npm**: 11.5.1
- **Git**

### Installation

```bash
git clone git@github.com:tekbreed/platform.git
cd platform
npm install
cp apps/web/.env.example apps/web/.env
# Edit .env with your configuration
npm run db:generate
npm run dev
```

The web app will be available at `http://localhost:5173`.

## 📦 Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start all apps |
| `npm run build` | Build all apps |
| `npm run test` | Run unit tests (watch) |
| `npm run test:run` | Run unit tests (CI) |
| `npm run test:e2e` | Run e2e tests |
| `npm run format-and-lint` | Check code quality |
| `npm run format-and-lint:fix` | Auto-fix issues |
| `npm run typecheck` | Type checking |

### Turbo Commands

```bash
turbo web#dev          # Start specific app
turbo build --filter=web   # Build specific app
turbo test:e2e --filter=web   # E2E tests for app
```

## 🏛️ Technology Stack

- **Frontend**: React 19, React Router v7, Tailwind CSS v4
- **Backend**: React Router SSR, Node.js
- **Database**: Prisma ORM + Turso (SQLite)
- **CMS**: Sanity.io
- **Auth**: Session-based + GitHub OAuth
- **Testing**: Vitest, Playwright
- **Code Quality**: Biome
- **Monorepo**: Turborepo
- **Deployment**: Railway

## 🤝 Contributing

See [docs/development.md](./docs/development.md) for:
- Development workflow
- Code style guidelines
- Testing requirements
- Pull request process

## 📝 License

Private - TekBreed © 2024