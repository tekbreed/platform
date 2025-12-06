---
trigger: always_on
---

# Testing React Router Apps with Vitest

Comprehensive guide for testing React Router applications using Vitest, covering Node and Browser modes with practical examples from this monorepo.

---

## 📦 Project Configuration

This monorepo uses a **dual-project Vitest setup** with separate configurations for browser and unit tests.

### File Naming Conventions

| Test Type | File Pattern | Environment |
|-----------|--------------|-------------|
| **Browser tests** | `*.browser.test.tsx` | Real browser (Chromium via Playwright) |
| **Unit tests** | `*.unit.test.ts` | Node.js |

### Root Configuration (`vitest.config.ts`)

```ts
import { playwright } from "@vitest/browser-playwright"
import { defineProject } from "vitest/config"

export default defineProject({
  test: {
    exclude: ["**/build/**", "**/dist/**", "**/node_modules/**", "**/e2e/**"],
    setupFiles: ["./packages/tests-config/src/setup-env.ts"],
    
    projects: [
      // Browser tests - run in real Chromium
      {
        test: {
          name: "browser",
          include: [
            "**/tests/**/*.browser.{test,spec}.{ts,tsx}",
            "**/__tests__/**/*.browser.{test,spec}.{ts,tsx}",
          ],
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
        },
      },
      // Unit tests - run in Node
      {
        test: {
          name: "unit",
          include: [
            "**/tests/**/*.unit.{test,spec}.ts",
            "**/__tests__/**/*.unit.{test,spec}.ts",
          ],
          environment: "node",
        },
      },
    ],
  },
})
```

---

## 🌐 Browser Mode Testing

Browser mode runs tests in a **real browser** using Playwright, providing accurate DOM behavior and browser APIs.

### When to Use Browser Mode

- ✅ Testing React components with routing (`useLoaderData`, `useActionData`, `<Link>`)
- ✅ Testing components that require real DOM APIs
- ✅ Testing visual interactions and user events
- ✅ Testing components with complex browser behavior

### Key Dependencies

```bash
pnpm add -D @vitest/browser-playwright vitest-browser-react
```

### Writing Browser Tests

Use `createRoutesStub` from React Router to test components that rely on routing context:

```tsx
// __tests__/my-component.browser.test.tsx
import { createRoutesStub } from "react-router"
import { describe, expect, it } from "vitest"
import { render } from "vitest-browser-react"

import { MyComponent } from "../my-component"

describe("MyComponent", () => {
  it("renders correctly with loader data", async () => {
    const Stub = createRoutesStub([
      {
        path: "/",
        HydrateFallback: () => <div>Loading...</div>,
        Component: MyComponent,
        loader() {
          return { user: { name: "John" } }
        },
      },
    ])

    const screen = render(<Stub initialEntries={["/"]} />)

    await expect
      .element(screen.getByRole("heading", { name: /john/i }))
      .toBeInTheDocument()
  })
})
```

### Testing Actions (Form Submissions)

```tsx
import { createRoutesStub } from "react-router"
import { render } from "vitest-browser-react"
import { userEvent } from "@vitest/browser/context"

describe("LoginForm", () => {
  it("displays validation errors", async () => {
    const Stub = createRoutesStub([
      {
        path: "/login",
        Component: LoginForm,
        action() {
          return {
            errors: {
              username: "Username is required",
              password: "Password is required",
            },
          }
        },
      },
    ])

    const screen = render(<Stub initialEntries={["/login"]} />)
    
    await userEvent.click(screen.getByRole("button", { name: /submit/i }))
    
    await expect
      .element(screen.getByText(/username is required/i))
      .toBeInTheDocument()
  })
})
```

### Browser Test Assertions

Browser mode uses **async assertions** with `expect.element()`:

```tsx
// ✅ Correct - async element assertions
await expect.element(screen.getByRole("button")).toBeInTheDocument()
await expect.element(screen.getByText("Hello")).toBeVisible()

// ❌ Wrong - sync assertions won't work in browser mode
expect(screen.getByRole("button")).toBeInTheDocument()
```

---

## 🖥️ Node Mode (Unit Tests)

Node mode runs tests in Node.js environment - faster but without real DOM.

### When to Use Node Mode

- ✅ Testing pure utility functions
- ✅ Testing data transformations
- ✅ Testing API handlers/services
- ✅ Testing business logic without UI

### Writing Unit Tests

```ts
// __tests__/utils.unit.test.ts
import { describe, expect, it } from "vitest"
import { formatDate, validateEmail } from "../utils"

describe("formatDate", () => {
  it("formats ISO date to readable string", () => {
    const result = formatDate("2024-01-15")
    expect(result).toBe("January 15, 2024")
  })
})

describe("validateEmail", () => {
  it("returns true for valid emails", () => {
    expect(validateEmail("test@example.com")).toBe(true)
  })

  it("returns false for invalid emails", () => {
    expect(validateEmail("invalid-email")).toBe(false)
  })
})
```

---

## 🎭 Mocking with MSW

The `@repo/tests-config` package provides shared MSW handlers for API mocking.

### Setup MSW in Tests

```ts
import { handlers } from "@repo/tests-config/mocks/handlers"
import { setupServer } from "msw/node"

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

### Using Mock Data

```tsx
import { mockUser } from "@repo/tests-config/mocks/user"
import { mockArticle } from "@repo/tests-config/mocks/article"

describe("UserProfile", () => {
  it("displays user information", () => {
    const user = mockUser({ name: "Jane Doe" })
    // Use mock data in test
  })
})
```

---

## ⚠️ React Router Testing Limitations

### Framework Mode Types Issue

When testing route components that use `Route.ComponentProps`, you'll encounter type mismatches:

```tsx
// Route component using framework types
export default function Login({ actionData }: Route.ComponentProps) {
  return <Form method="post">...</Form>
}

// Test - will have type errors
const Stub = createRoutesStub([
  {
    path: "/login",
    // @ts-expect-error: `matches` won't align between test and app
    Component: LoginRoute,
    action() { /* ... */ },
  },
])
```

**Recommendation**: Use `createRoutesStub` for **reusable components** that use hooks (`useLoaderData`, `useActionData`). For full route testing, use **E2E tests** (Playwright).

---

## 🏃 Running Tests

```bash
# Run all tests
pnpm test

# Run only browser tests
pnpm test --project browser

# Run only unit tests
pnpm test --project unit

# Watch mode
pnpm test --watch

# Run specific file
pnpm test path/to/test.browser.test.tsx
```

---

## 📁 Test File Organization

```
src/
├── routes/
│   └── home/
│       ├── __tests__/
│       │   ├── index.browser.test.tsx    # Browser tests
│       │   └── utils.unit.test.ts        # Unit tests
│       ├── index.tsx
│       └── utils.ts
```

---

## 📝 Quick Reference

| Task | Mode | File Suffix |
|------|------|-------------|
| Test React components with routing | Browser | `.browser.test.tsx` |
| Test component rendering | Browser | `.browser.test.tsx` |
| Test pure functions | Unit | `.unit.test.ts` |
| Test data utilities | Unit | `.unit.test.ts` |
| Full route integration | E2E (Playwright) | Use `/e2e` folder |
