# TekBreed Platform Documentation

Welcome to the TekBreed Platform documentation. This guide covers architecture, development, and deployment of the platform.

## Quick Links

| Document | Description |
|----------|-------------|
| [Getting Started](./getting-started.md) | Setup and first run |
| [Architecture](./architecture.md) | System design and component overview |
| [Development](./development.md) | Development workflow and commands |
| [Deployment](./deployment.md) | CI/CD and Railway deployment |

## Apps Overview

| App | Description | Port |
|-----|-------------|------|
| [web](../apps/web/README.md) | Main web application | 5173 |
| [cms](../apps/cms/README.md) | Sanity Studio CMS | 3333 |
| admin | Admin dashboard | - |
| chat | AI chat interface | - |
| classroom | Learning management | - |
| coding-challenges | Code challenges platform | - |
| docs | Documentation site | - |
| job-board | Job listings | - |
| lms | Learning system | - |
| mcp | MCP server | - |
| notes | Notes application | - |
| store | E-commerce store | - |
| teams | Team management | - |
| apis | API services | - |

## Packages

| Package | Description |
|---------|-------------|
| [@repo/database](../packages/database/README.md) | Prisma + Turso database layer |
| [@repo/ui](../packages/ui/README.md) | Shared React components |
| [@repo/utils](../packages/utils/README.md) | Shared utilities |
| [@repo/base-config](../packages/base-config/README.md) | Shared configuration |
| [@repo/tests-config](../packages/tests-config/README.md) | Testing utilities |
| [@repo/typescript-config](../packages/typescript-config/README.md) | TypeScript configs |

## Contributing

See [development.md](./development.md) for development guidelines and pull request process.
