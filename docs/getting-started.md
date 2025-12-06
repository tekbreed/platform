# Getting Started

Quick setup guide for new team members.

## Prerequisites

- **Node.js** >= 22.0.0
- **npm** 11.5.1
- **Git**

## Setup

### 1. Clone Repository

```bash
git clone git@github.com:tekbreed/platform.git
cd platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the example environment file:

```bash
cp apps/web/.env.example apps/web/.env
```

Update `.env` with your credentials. **Required variables:**

| Variable | Description |
|----------|-------------|
| `SESSION_SECRET` | Random string for session encryption |
| `HONEYPOT_SECRET` | Random string for form protection |
| `DATABASE_URL` | Database connection (default: `file:./dev.db`) |

Ask a team lead for access to shared secrets (Sanity, Turso, etc.).

### 4. Generate Database Client

```bash
npm run db:generate
```

### 5. Start Development

```bash
# All apps
npm run dev

# Specific app
turbo web#dev
```

The web app runs at `http://localhost:5173`.

## Verify Setup

- [ ] `npm run dev` starts without errors
- [ ] `http://localhost:5173` loads the home page
- [ ] `npm run test:run` passes
- [ ] `npm run typecheck` passes

## Next Steps

- Read [Development Workflow](./development.md)
- Review [Architecture](./architecture.md)
- Check app-specific READMEs in `apps/*/README.md`
