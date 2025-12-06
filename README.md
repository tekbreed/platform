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
turbo <app>#dev
```

The web app will be available at `http://localhost:5173`.

## 📦 Commands

| Command | Description |
|---------|-------------|
| `turbo web#dev` | Start web app |
| `turbo build#web` | Build web app |
| `turbo test:e2e#web` | Run e2e tests for web app |
| `turbo format-and-lint` | Check code quality |
| `turbo format-and-lint:fix#web` | Auto-fix issues |
| `turbo typecheck#web` | Type checking |

### Turbo Commands

```bash
turbo dev --filter=<app>  # Start specific app
turbo build --filter=<app | package>   # Build specific app
turbo test:e2e --filter=<app>   # E2E tests for app
turbo format-and-lint   # Check code quality
turbo format-and-lint:fix   # Auto-fix issues
turbo typecheck --filter=<app | package>   # Type checking
```

Or you can use the following commands:

```bash
turbo <app>#dev          # Start specific app
turbo <app>#build   # Build specific app
turbo <app>#test:e2e   # E2E tests for app
turbo format-and-lint   # Check code quality
turbo format-and-lint:fix   # Auto-fix issues
turbo <app>#typescheck  # Type checking
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

Private - TekBreed © 2025