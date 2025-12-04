# @repo/utils

Shared utilities and helper functions for TekBreed Platform.

## 📦 Overview

This package provides shared utilities, hooks, providers, and server-side helpers used across all apps in the monorepo. It includes authentication utilities, content management, email services, and more.

## 🎯 What's Included

- **Authentication**: Auth utilities and session management
- **Hooks**: Reusable React hooks
- **Providers**: React context providers
- **Server Utilities**: Server-side helpers (email, storage, theme, etc.)
- **Content Management**: Sanity CMS integration and content utilities
- **Constants**: Shared constants and configuration

## 📥 Installation

This package is automatically available in the monorepo workspace. Import utilities in your app:

```tsx
// Client-side
import { useDoubleCheck } from "@repo/utils/hooks/use-double-check"
import { ThemeProvider } from "@repo/utils/providers/theme-provider"

// Server-side
import { sendEmail } from "@repo/utils/email.server"
import { getEnv } from "@repo/utils/env.server"
import { honeypot } from "@repo/utils/honeypot.server"
```

## 📁 Package Structure

```
packages/utils/
├── src/
│   ├── auth/             # Authentication utilities
│   ├── hooks/            # React hooks
│   ├── providers/        # React context providers
│   ├── constants/        # Shared constants
│   ├── content.server/   # Content management (Sanity)
│   ├── email.server.ts   # Email utilities (Resend)
│   ├── env.server.ts     # Environment variables
│   ├── honeypot.server.ts # Honeypot spam protection
│   ├── misc.server.ts    # Misc server utilities
│   ├── storage.server.ts # File storage (Bunny CDN)
│   ├── theme.server.ts   # Theme management
│   ├── toast.server.ts   # Toast notifications
│   └── misc.ts           # Client utilities
└── package.json
```

## 🎯 Exports

```json
{
  "./auth/*": "./src/auth/*.ts",
  "./hooks/*": "./src/hooks/*.tsx",
  "./providers/*": "./src/providers/*.tsx",
  "./misc": "./src/misc.ts",
  "./constants/*": "./src/constants/*.tsx",
  "./honeypot.server": "./src/honeypot.server.ts",
  "./misc.server": "./src/misc.server.ts",
  "./env.server": "./src/env.server.ts",
  "./email.server": "./src/email.server.ts",
  "./theme.server": "./src/theme.server.ts",
  "./toast.server": "./src/toast.server.ts",
  "./storage.server": "./src/storage.server.ts",
  "./content.server/*": "./src/content.server/*.ts"
}
```

## 🔧 Key Features

### Authentication
- Session management with encrypted cookies
- OAuth integration (GitHub)
- Password hashing with bcrypt
- TOTP for two-factor authentication

### Content Management
- Sanity CMS client integration
- GROQ query utilities
- Content fetching and caching

### Server Utilities
- **Email**: Transactional emails with Resend
- **Storage**: File uploads to Bunny CDN
- **Theme**: Dark/light mode management
- **Honeypot**: Spam protection
- **Environment**: Type-safe env variable access

### Hooks
- `useDoubleCheck`: Confirmation before destructive actions
- `useDebounce`: Debounce values
- `useHydrated`: Check if component is hydrated
- And more...

### Providers
- `ThemeProvider`: Theme context
- `ToastProvider`: Toast notifications
- And more...

## 📚 Key Dependencies

- **@conform-to/react**: Form validation
- **remix-auth**: Authentication
- **remix-utils**: Remix utilities
- **@sanity/client**: Sanity CMS client
- **resend**: Email service
- **bcryptjs**: Password hashing
- **@anthropic-ai/sdk**: AI integration
- **discord.js**: Discord integration
- **@repo/database**: Database access
- **@repo/ui**: UI components

## 🔗 Usage Examples

### Authentication

```tsx
import { requireUserId } from "@repo/utils/auth/auth.server"

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request)
  // User is authenticated
}
```

### Email

```tsx
import { sendEmail } from "@repo/utils/email.server"

await sendEmail({
  to: "user@example.com",
  subject: "Welcome!",
  html: "<p>Welcome to TekBreed Platform</p>"
})
```

### Content (Sanity)

```tsx
import { getArticles } from "@repo/utils/content.server/articles"

const articles = await getArticles()
```

### Hooks

```tsx
import { useDoubleCheck } from "@repo/utils/hooks/use-double-check"

function DeleteButton() {
  const dc = useDoubleCheck()
  
  return (
    <button {...dc.getButtonProps()}>
      {dc.doubleCheck ? "Are you sure?" : "Delete"}
    </button>
  )
}
```

## 🔗 Related Documentation

- [Root README](../../README.md)
- [Remix Documentation](https://remix.run/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
