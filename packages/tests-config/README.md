# @repo/tests-config

Shared testing configuration and utilities for TekBreed Platform.

## 📦 Overview

This package provides shared testing utilities, mock data, and test configuration used across all apps in the monorepo. It includes MSW (Mock Service Worker) handlers and test fixtures.

## 🎯 What's Included

- Mock Service Worker (MSW) handlers
- Test fixtures and factories
- Shared test utilities
- Mock data generators

## 📥 Installation

This package is automatically available in the monorepo workspace. Import test utilities in your tests:

```tsx
import { mockUser } from "@repo/tests-config/mocks/user"
import { mockArticle } from "@repo/tests-config/mocks/article"
```

## 📁 Package Structure

```
packages/tests-config/
├── src/
│   └── mocks/            # MSW mock handlers
│       ├── user.ts
│       ├── article.ts
│       ├── auth.ts
│       └── ...
└── package.json
```

## 🎯 Exports

```json
{
  "./mocks/*": "./src/mocks/*.ts"
}
```

## 📚 Key Dependencies

- **@repo/utils**: Utility functions
- **@repo/database**: Database types and utilities

## 🔧 Usage

### In Tests

```tsx
import { mockUser } from "@repo/tests-config/mocks/user"
import { mockArticle } from "@repo/tests-config/mocks/article"

describe("UserProfile", () => {
  it("displays user information", () => {
    const user = mockUser()
    // Use mock user in test
  })
})
```

### With MSW

```tsx
import { handlers } from "@repo/tests-config/mocks/handlers"
import { setupServer } from "msw/node"

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

## 🔗 Related Documentation

- [Root README](../../README.md)
- [MSW Documentation](https://mswjs.io/)
- [Vitest Documentation](https://vitest.dev/)
