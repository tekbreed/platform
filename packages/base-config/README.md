# @repo/base-config

Base React Router configuration and shared app settings for TekBreed Platform.

## 📦 Overview

This package provides base configuration for React Router applications, including shared routes, middleware, and application settings. It centralizes common configuration to ensure consistency across all apps in the monorepo.

## 🎯 What's Included

- Base React Router configuration
- Shared application settings
- Common middleware setup
- Analytics integration (PostHog)
- Shared route utilities

## 📥 Installation

This package is automatically available in the monorepo workspace. Import configuration in your app:

```tsx
import { baseConfig } from "@repo/base-config"
```

## 📁 Package Structure

```
packages/base-config/
├── src/
│   ├── config.ts         # Base configuration
│   ├── middleware.ts     # Shared middleware
│   ├── analytics.ts      # Analytics setup
│   └── ...
└── package.json
```

## 🎯 Exports

```json
{
  "@/*": "./src/*"
}
```

## 📚 Key Dependencies

- **@repo/database**: Database access
- **@repo/ui**: UI components
- **@repo/utils**: Utility functions
- **posthog-js**: Analytics and feature flags

## 🔧 Usage

This package is typically imported in your app's root configuration:

```tsx
// In your app's root or config file
import { baseConfig } from "@repo/base-config"

export default {
  ...baseConfig,
  // App-specific overrides
}
```

## 🔗 Related Documentation

- [Root README](../../README.md)
- [React Router Documentation](https://reactrouter.com/)
- [PostHog Documentation](https://posthog.com/docs)
