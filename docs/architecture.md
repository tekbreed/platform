# Architecture

System architecture and component relationships for TekBreed Platform.

## High-Level Architecture

```mermaid
graph TB
    subgraph "Frontend Apps"
        WEB[Web App]
        ADMIN[Admin Dashboard]
        CHAT[Chat Interface]
        CMS[Sanity CMS]
    end

    subgraph "Learning Apps"
        CLASSROOM[Classroom]
        CHALLENGES[Coding Challenges]
        LMS[LMS]
        NOTES[Notes]
    end

    subgraph "Business Apps"
        JOBS[Job Board]
        STORE[Store]
        TEAMS[Teams]
    end

    subgraph "Backend Services"
        APIS[APIs]
        MCP[MCP Server]
    end

    subgraph "Shared Packages"
        DB[("@repo/database")]
        UI["@repo/ui"]
        UTILS["@repo/utils"]
    end

    subgraph "External Services"
        SANITY[(Sanity)]
        TURSO[(Turso DB)]
        RAILWAY[Railway]
        RESEND[Resend Email]
        BUNNY[Bunny CDN]
    end

    WEB --> DB
    WEB --> UI
    WEB --> UTILS
    WEB --> SANITY
    APIS --> DB
    APIS --> TURSO
    CMS --> SANITY
```

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, React Router v7, Tailwind CSS v4 |
| **Backend** | Node.js, React Router SSR |
| **Database** | Turso (SQLite), Prisma ORM |
| **CMS** | Sanity.io |
| **Auth** | Session-based, GitHub OAuth |
| **Email** | Resend |
| **Storage** | Bunny CDN |
| **Payments** | Polar |
| **Hosting** | Railway |

## Monorepo Structure

```
platform/
├── apps/                    # Applications
│   ├── web/                 # Main web app (React Router v7)
│   ├── cms/                 # Sanity Studio
│   ├── admin/               # Admin dashboard
│   ├── chat/                # AI chat interface
│   ├── classroom/           # Classroom app
│   ├── coding-challenges/   # Code challenges
│   ├── docs/                # Documentation site
│   ├── job-board/           # Job listings
│   ├── lms/                 # Learning management
│   ├── mcp/                 # MCP server
│   ├── notes/               # Notes app
│   ├── store/               # E-commerce
│   ├── teams/               # Team management
│   └── apis/                # API services
├── packages/                # Shared packages
│   ├── database/            # Prisma + Turso
│   ├── ui/                  # React components
│   ├── utils/               # Utilities
│   ├── base-config/         # Shared config
│   ├── tests-config/        # Test utilities
│   └── typescript-config/   # TS configs
├── docs/                    # Documentation
└── .github/                 # CI/CD workflows
```

## Data Flow

### Content Flow
1. Content created in **Sanity CMS**
2. Fetched by **Web App** via GROQ queries
3. Rendered with SSR via **React Router**

### User Flow
1. Users authenticate via GitHub OAuth or email/password
2. Sessions stored encrypted in cookies
3. User data persisted in **Turso** via **Prisma**

### Deployment Flow
1. Push to `dev` → CI runs → Deploy to **development**
2. PR merge to `main` → CI runs → Deploy to **production**
3. Railway handles container orchestration
