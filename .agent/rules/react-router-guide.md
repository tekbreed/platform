---
trigger: always_on
---

# React Router Framework Mode Guide

Comprehensive guide for building optimized React Router v7 applications with data streaming, pending UI, and best practices for superior UX/DX.

---

## 📁 Route Configuration

### Configuring Routes (`app/routes.ts`)

```ts
import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes"

export default [
  index("./home.tsx"),
  route("about", "./about.tsx"),

  // Layout routes (no URL segment)
  layout("./auth/layout.tsx", [
    route("login", "./auth/login.tsx"),
    route("register", "./auth/register.tsx"),
  ]),

  // Prefixed routes
  ...prefix("dashboard", [
    index("./dashboard/home.tsx"),
    route("settings", "./dashboard/settings.tsx"),
  ]),

  // Dynamic segments
  route("articles/:slug", "./articles/article.tsx"),
] satisfies RouteConfig
```

### Route Types
| Type | Description |
|------|-------------|
| `route(path, file)` | Standard route with URL segment |
| `index(file)` | Default child route (no URL segment) |
| `layout(file, children)` | Wrapper without URL segment |
| `prefix(path, children)` | Add URL prefix to children |

---

## 📦 Route Module Exports

A route module can export the following:

```ts
import type { Route } from "./+types/my-route"

// Server-only data loading
export async function loader({ params, request }: Route.LoaderArgs) {}

// Client-only data loading
export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {}

// Server-only mutations
export async function action({ request }: Route.ActionArgs) {}

// Client-only mutations  
export async function clientAction({ serverAction }: Route.ClientActionArgs) {}

// Main component
export default function Component({ loaderData, actionData }: Route.ComponentProps) {}

// Error handling
export function ErrorBoundary() {}

// Loading fallback for clientLoader
export function HydrateFallback() {}

// SEO metadata
export function meta({ data }: Route.MetaArgs) {}

// HTTP headers
export function headers() {}

// Link elements for <head>
export function links() {}

// Custom data for useMatches
export const handle = { breadcrumb: "Home" }
```

---

## ⚡ Data Loading Patterns

### Server Loader (SSR)

```tsx
import type { Route } from "./+types/article"
import { db } from "~/lib/db"

export async function loader({ params }: Route.LoaderArgs) {
  const article = await db.article.findUnique({
    where: { slug: params.slug }
  })
  if (!article) throw new Response("Not Found", { status: 404 })
  return { article }
}

export default function Article({ loaderData }: Route.ComponentProps) {
  return <h1>{loaderData.article.title}</h1>
}
```

### Client Loader (SPA-like)

```tsx
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const res = await fetch(`/api/products/${params.id}`)
  return res.json()
}

// Required when using clientLoader without server loader
export function HydrateFallback() {
  return <div>Loading...</div>
}
```

### Using Both Loaders

```tsx
export async function loader({ params }: Route.LoaderArgs) {
  return db.getProduct(params.id)
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  // Can call server loader from client
  const serverData = await serverLoader()
  
  // Augment with client-side data
  const clientCache = getFromLocalCache()
  return { ...serverData, ...clientCache }
}

// Force clientLoader to run on hydration
clientLoader.hydrate = true as const
```

---

## 🌊 Data Streaming with Suspense

Stream non-critical data for faster initial renders:

```tsx
import type { Route } from "./+types/dashboard"
import { Suspense } from "react"
import { Await } from "react-router"

export async function loader() {
  // Critical data - await it
  const user = await db.getUser()
  
  // Non-critical data - DON'T await, return the promise
  const recommendations = db.getRecommendations()
  const analytics = db.getAnalytics()

  return { user, recommendations, analytics }
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { user, recommendations, analytics } = loaderData

  return (
    <div>
      {/* Renders immediately */}
      <h1>Welcome, {user.name}</h1>

      {/* Streams in when ready */}
      <Suspense fallback={<RecommendationsSkeleton />}>
        <Await resolve={recommendations}>
          {(data) => <Recommendations data={data} />}
        </Await>
      </Suspense>

      <Suspense fallback={<AnalyticsSkeleton />}>
        <Await resolve={analytics}>
          {(data) => <AnalyticsChart data={data} />}
        </Await>
      </Suspense>
    </div>
  )
}
```

### With React 19 `use()`

```tsx
import { use, Suspense } from "react"

function RecommendationsSection({ promise }: { promise: Promise<Data> }) {
  const data = use(promise) // Suspends until resolved
  return <Recommendations data={data} />
}

// In parent:
<Suspense fallback={<Skeleton />}>
  <RecommendationsSection promise={loaderData.recommendations} />
</Suspense>
```

### Configure Stream Timeout

```tsx
// entry.server.tsx
export const streamTimeout = 10_000 // 10 seconds (default: 4950ms)
```

---

## 🔄 Pending UI

### Global Navigation Indicator

```tsx
import { useNavigation, Outlet } from "react-router"

export default function Root() {
  const navigation = useNavigation()
  const isNavigating = Boolean(navigation.location)

  return (
    <html>
      <body>
        {isNavigating && <GlobalSpinner />}
        <Outlet />
      </body>
    </html>
  )
}
```

### Local Link Indicators

```tsx
import { NavLink } from "react-router"

<NavLink to="/dashboard">
  {({ isPending, isActive }) => (
    <span className={isActive ? "active" : isPending ? "pending" : ""}>
      Dashboard {isPending && <Spinner />}
    </span>
  )}
</NavLink>
```

### Form Submission States

```tsx
import { useFetcher } from "react-router"

function SubmitButton() {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state !== "idle"

  return (
    <fetcher.Form method="post">
      <input name="email" />
      <button disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Subscribe"}
      </button>
    </fetcher.Form>
  )
}
```

---

## ✨ Optimistic UI

Update UI immediately before server confirms:

```tsx
import { useFetcher } from "react-router"

function TodoItem({ todo }) {
  const fetcher = useFetcher()
  
  // Use optimistic value if submitting, otherwise actual value
  const isComplete = fetcher.formData
    ? fetcher.formData.get("status") === "complete"
    : todo.status === "complete"

  return (
    <fetcher.Form method="post">
      <span style={{ textDecoration: isComplete ? "line-through" : "none" }}>
        {todo.title}
      </span>
      <button
        name="status"
        value={isComplete ? "incomplete" : "complete"}
      >
        {isComplete ? "Undo" : "Complete"}
      </button>
    </fetcher.Form>
  )
}
```

---

## 📝 Actions & Mutations

### Server Action

```tsx
import type { Route } from "./+types/new-post"
import { Form, redirect } from "react-router"
import { db } from "~/lib/db"

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const title = formData.get("title")
  
  const post = await db.post.create({ data: { title } })
  
  return redirect(`/posts/${post.id}`)
}

export default function NewPost() {
  return (
    <Form method="post">
      <input name="title" required />
      <button type="submit">Create Post</button>
    </Form>
  )
}
```

### Action with Validation Errors

```tsx
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const email = formData.get("email")
  
  if (!isValidEmail(email)) {
    return { errors: { email: "Invalid email" } }
  }
  
  await subscribe(email)
  return { success: true }
}

export default function Subscribe({ actionData }: Route.ComponentProps) {
  return (
    <Form method="post">
      <input name="email" />
      {actionData?.errors?.email && (
        <span className="error">{actionData.errors.email}</span>
      )}
      <button>Subscribe</button>
    </Form>
  )
}
```

---

## 🛡️ Error Handling

```tsx
import { isRouteErrorResponse, useRouteError } from "react-router"

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status} {error.statusText}</h1>
        <p>{error.data}</p>
      </div>
    )
  }

  if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
      </div>
    )
  }

  return <h1>Unknown Error</h1>
}
```

---

## 🏷️ Type Safety

Types are auto-generated from your route config:

```tsx
// Import generated types
import type { Route } from "./+types/my-route"

// All args and props are fully typed
export async function loader({ params }: Route.LoaderArgs) {
  // params.slug is typed based on route pattern
}

export default function Component({ loaderData }: Route.ComponentProps) {
  // loaderData is typed based on loader return
}
```

### Generate Types

```bash
react-router typegen        # One-time generation
react-router typegen --watch # Watch mode
```

---

## 🎯 SEO & Meta

```tsx
import type { Route } from "./+types/article"

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: data.article.title },
    { name: "description", content: data.article.excerpt },
    { property: "og:title", content: data.article.title },
  ]
}
```

---

## 📋 Quick Reference

| Pattern | Use Case |
|---------|----------|
| `loader` | Server-side data fetching |
| `clientLoader` | Client-side only fetching |
| `HydrateFallback` | Loading UI for clientLoader |
| `<Await>` + `<Suspense>` | Stream non-critical data |
| `useNavigation` | Global pending states |
| `useFetcher` | Independent form submissions |
| `fetcher.formData` | Optimistic UI updates |
| `ErrorBoundary` | Graceful error handling |

---

## 🏃 Performance Checklist

- [ ] Return promises (don't await) for non-critical data
- [ ] Use `<Suspense>` + `<Await>` to stream deferred data
- [ ] Show pending UI during navigation with `useNavigation`
- [ ] Implement optimistic UI with `useFetcher.formData`
- [ ] Use `HydrateFallback` for client-only routes
- [ ] Add appropriate `Cache-Control` headers
- [ ] Pre-render static routes in `react-router.config.ts`
