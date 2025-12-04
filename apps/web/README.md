# Web App

The main web application for TekBreed Platform, built with React Router v7 and modern web technologies.

## 🎯 Overview

This is a full-stack web application featuring:

- **Server-Side Rendering (SSR)** with React Router v7
- **Authentication** with session management and OAuth (GitHub)
- **Content Management** integration with Sanity CMS
- **Database** powered by Turso (SQLite) with Prisma ORM
- **Styling** with Tailwind CSS v4
- **Testing** with Playwright for e2e tests
- **Mock Service Worker** for API mocking during development

## 🚀 Getting Started

### Prerequisites

- Node.js >= 22.0.0
- npm 11.5.1
- All dependencies installed at the monorepo root

### Installation

From the **monorepo root**, run:

```bash
npm install
```

### Environment Setup

1. Copy the example environment file:
   ```bash
   cp apps/web/.env.example apps/web/.env
   ```

2. Update the `.env` file with your configuration:

   **Required for local development:**
   - `SESSION_SECRET`: Random string for session encryption
   - `HONEYPOT_SECRET`: Random string for honeypot protection
   - `DATABASE_URL`: Local SQLite database path (default: `file:./dev.db`)

   **Optional (for full functionality):**
   - Sanity CMS credentials (`SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`)
   - GitHub OAuth (`GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`)
   - Email service (`RESEND_API_KEY`)
   - AI services (`ANTHROPIC_API_KEY`, `VOYAGE_API_KEY`)
   - Storage (`BUNNY_*` variables)
   - Payments (`POLAR_*` variables)

3. Generate the Prisma client:
   ```bash
   npm run db:generate
   ```

### Development

**Always run commands from the monorepo root using Turborepo.**

Start the development server:

```bash
# Start web app only
turbo web#dev

# Or start all apps
npm run dev
```

> [!NOTE]
> When you run `turbo web#dev`, Turborepo will automatically start the CMS app first (as web depends on it), then start the web app. This dependency is configured in the root `turbo.json`.

The app will be available at `http://localhost:5173` (or the port specified in `PORT` env variable).

**Note:** Development mode runs with `MOCKS=true` by default, which enables MSW for API mocking.

## 📜 Available Scripts

**All commands should be run from the monorepo root** using Turborepo:

| Command | Description |
|---------|-------------|
| `turbo web#dev` | Start web app development server with mocks |
| `turbo web#build` | Build web app for production |
| `turbo web#start` | Start production server (after build) |
| `turbo web#typecheck` | Run TypeScript type checking |
| `turbo test` | Run all unit tests (watch mode) |
| `turbo test:run` | Run unit tests once (CI mode) |
| `turbo test:e2e --filter=web` | Run Playwright e2e tests for web |
| `turbo test:e2e:run --filter=web` | Run e2e tests in CI mode |
| `turbo test:e2e:ui --filter=web` | Open Playwright UI |
| `turbo test:e2e:report --filter=web` | Show e2e test report |

> [!IMPORTANT]
> **Always use Turborepo from the monorepo root** for consistency and to ensure proper dependency management. While `npm run` commands work from the app directory, they don't benefit from Turborepo's caching and dependency orchestration.

## 📁 Project Structure

```
apps/web/
├── src/
│   ├── routes/              # Route components and loaders
│   │   ├── home/           # Home page
│   │   ├── articles/       # Articles pages
│   │   ├── auth/           # Authentication flows
│   │   ├── profile/        # User profile pages
│   │   └── ...
│   ├── components/         # Shared React components
│   ├── utils/              # Utility functions
│   ├── styles/             # Global styles
│   ├── root.tsx            # Root component
│   ├── entry.client.tsx    # Client entry point
│   ├── entry.server.tsx    # Server entry point
│   └── routes.ts           # Route configuration
├── tests/
│   ├── e2e/                # E2E tests
│   ├── fixtures/           # Test fixtures
│   └── mocks/              # MSW mock handlers
├── public/                 # Static assets
├── .env.example            # Environment variables template
├── playwright.config.ts    # Playwright configuration
├── vite.config.ts          # Vite configuration
└── react-router.config.ts  # React Router configuration
```

## 🛣️ Key Routes

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/articles` | Articles listing |
| `/articles/:slug` | Article detail page |
| `/auth/signin` | Sign in page |
| `/auth/signup` | Sign up page |
| `/profile` | User profile |
| `/about` | About page |
| `/support` | Support page |
| `/faqs` | FAQs page |

## 🧪 Testing

### E2E Tests

E2E tests are located in `tests/e2e/` and use Playwright.

**Run tests from the monorepo root:**
```bash
# Run e2e tests for web app
turbo test:e2e --filter=web

# Run in CI mode
turbo test:e2e:run --filter=web

# Open Playwright UI
turbo test:e2e:ui --filter=web

# View test report
turbo test:e2e:report --filter=web
```

### Test Files

- `home.spec.ts`: Home page navigation and responsive layout
- `articles.spec.ts`: Articles listing and detail pages
- `auth.spec.ts`: Authentication flows (signin, signup, password reset)

## 🎨 Styling

The app uses **Tailwind CSS v4** with a custom design system. Styles are configured in:

- Global styles: `src/styles/`
- Tailwind config: Embedded in `vite.config.ts`
- Component styles: Inline with Tailwind utilities

## 🔐 Authentication

Authentication is handled with:

- **Session-based auth** using encrypted cookies
- **OAuth providers**: GitHub (more can be added)
- **Password auth**: Email/password with bcrypt hashing
- **Email verification**: Token-based verification flow
- **Password reset**: Secure token-based reset flow

## 📦 Dependencies

### Key Dependencies

- **react** & **react-dom**: ^19.1.1
- **react-router**: ^7.9.4
- **@react-router/node**: ^7.9.4
- **@react-router/serve**: ^7.9.4
- **lucide-react**: Icon library
- **framer-motion**: Animation library
- **date-fns**: Date utilities

### Workspace Dependencies

- **@repo/database**: Shared database layer (Prisma + Turso)
- **@repo/ui**: Shared UI components (React + Tailwind CSS)
- **@repo/utils**: Shared utilities and helper functions
- **@repo/base-config**: Base React Router configuration

## 🚢 Deployment

### Build for Production

From the **monorepo root**:

```bash
turbo web#build
```

This creates a production build in the `build/` directory.

### Start Production Server

From the **monorepo root**:

```bash
turbo web#start
```

### Docker

A Dockerfile is included for containerized deployments:

```bash
docker build -t tekbreed-web .
docker run -p 3000:3000 tekbreed-web
```

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
- Change the `PORT` in your `.env` file
- Kill the process using the port: `lsof -ti:5173 | xargs kill`

**Database errors:**
- Ensure you've run `npm run db:generate` from the root
- Check your `DATABASE_URL` in `.env`

**Mock data not loading:**
- Ensure `MOCKS=true` is set in development
- Check MSW handlers in `tests/mocks/`

**Playwright tests failing:**
- Install browsers: `npm run test:e2e:install`
- Check the dev server is running on the correct port
- Increase timeout in `playwright.config.ts` if needed

**Build errors:**
- Clear Turbo cache: `rm -rf .turbo`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Ensure all workspace dependencies are built: `npm run build` from root

## 🔗 Related Documentation

- [Root README](../../README.md)
- [Contributing Guidelines](../../CONTRIBUTING.md)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Playwright Documentation](https://playwright.dev/)

## 📞 Support

For issues specific to the web app, please check:
1. This README's troubleshooting section
2. The root [CONTRIBUTING.md](../../CONTRIBUTING.md)
3. Open an issue in the repository