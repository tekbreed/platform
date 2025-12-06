---
trigger: always_on
---

# Shadcn UI, Tailwind CSS & Lucide Icons Guide

This guide covers the patterns and conventions for using shadcn/ui components, Tailwind CSS styling, and Lucide icons in this monorepo.

---

## 📦 Package Structure

All UI code lives in `packages/ui`:

```
packages/ui/src/
├── components/     # Base shadcn components (49 files)
├── composed/       # Complex composed components (icons, forms, etc.)
├── email/          # React Email templates
├── lib/            # Utilities (cn function)
└── styles/         # Global CSS, themes
```

---

## 🎨 Icons

### ✅ Always Use Centralized Icons

**Never import directly from `lucide-react`**. Use the centralized `Icons` object:

```tsx
// ✅ CORRECT
import { Icons } from "@repo/ui/composed/icons"

<Icons.check className="size-4" />
<Icons.spinner />
<Icons.github className="size-5" />
```

```tsx
// ❌ WRONG - Never do this
import { Check, Spinner } from "lucide-react"
```

### Adding New Icons

1. **Lucide icons**: Add to imports and export in `icons.tsx`:
```tsx
// In packages/ui/src/composed/icons.tsx
import { NewIcon } from "lucide-react"

export const Icons = {
  // ... existing icons
  newIcon: NewIcon,
}
```

2. **Custom/Deprecated icons**: Create as inline SVG with `IconProps`:
```tsx
customIcon: ({ size, className }: IconProps = {}) => (
  <svg
    className={cn("h-5 w-5", className)}
    height={size || 24}
    width={size || 24}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <title>Custom Icon</title>
    <path d="..." />
  </svg>
),
```

### Icon Props Pattern

```tsx
interface IconProps {
  size?: number | string
  className?: string
}
```

### Available Brand Icons (Custom SVGs)
- `Icons.github` - GitHub
- `Icons.twitter` - X/Twitter  
- `Icons.linkedIn` - LinkedIn
- `Icons.youtube` - YouTube
- `Icons.discord` - Discord
- `Icons.codesandbox` - CodeSandbox

---

## 🎨 Tailwind CSS

### Version & Setup

- **Tailwind CSS v4.1** with modern `@theme` directives
- OKLCH color system for perceptually uniform colors
- CSS variables for theming

### The `cn()` Utility

Always use `cn()` for conditional/merged classes:

```tsx
import { cn } from "@repo/ui/lib/utils"

// Merge base + conditional + override classes
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className // allows overrides from props
)} />
```

### Theme Colors (CSS Variables)

Use semantic color tokens, not raw colors:

```tsx
// ✅ CORRECT - Semantic tokens
className="bg-background text-foreground"
className="bg-primary text-primary-foreground"
className="bg-muted text-muted-foreground"
className="border-border"

// ❌ WRONG - Raw colors
className="bg-gray-900 text-white"
```

**Available tokens:**
| Token | Usage |
|-------|-------|
| `background/foreground` | Page background & text |
| `card/card-foreground` | Card surfaces |
| `primary/primary-foreground` | Primary actions |
| `secondary/secondary-foreground` | Secondary actions |
| `muted/muted-foreground` | Subdued content |
| `accent/accent-foreground` | Highlights |
| `destructive` | Error/delete actions |
| `border` | Borders |
| `input` | Input borders |
| `ring` | Focus rings |

### Dark Mode

Uses `data-theme="dark"` attribute selector:

```tsx
// Automatic via CSS variables - just use tokens!
className="bg-background" // Works in both light/dark

// Manual overrides when needed
className="dark:bg-slate-900"
```

### Common Sizing Patterns

```tsx
// Icons
className="size-4"  // 16px
className="size-5"  // 20px
className="size-6"  // 24px

// Spacing
className="p-4"     // padding
className="gap-2"   // flex/grid gap
className="space-y-4" // vertical spacing
```

---

## 🧩 Shadcn Components

### Configuration

From `components.json`:
- **Style**: `new-york`
- **Base color**: `slate`
- **CSS Variables**: Enabled
- **Icon library**: `lucide`

### Importing Components

```tsx
// Base components
import { Button } from "@repo/ui/components/button"
import { Input } from "@repo/ui/components/input"
import { Dialog, DialogContent, DialogTitle } from "@repo/ui/components/dialog"

// Composed components  
import { Icons } from "@repo/ui/composed/icons"
import { FormError } from "@repo/ui/composed/form-error"

// Utilities
import { cn } from "@repo/ui/lib/utils"
```

### Variant Pattern (CVA)

Components use `class-variance-authority` for variants:

```tsx
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "base-classes", // Always applied
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-white",
        outline: "border bg-background",
        secondary: "bg-secondary text-secondary-foreground",
        ghost: "hover:bg-accent",
        link: "text-primary underline-offset-4",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-10 px-6",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### Button with Icon Example

```tsx
import { Button } from "@repo/ui/components/button"
import { Icons } from "@repo/ui/composed/icons"

<Button>
  <Icons.check className="mr-2 size-4" />
  Submit
</Button>

<Button variant="outline" size="icon">
  <Icons.menu />
</Button>
```

---

## 📝 Quick Reference

### Do's ✅

- Import icons from `@repo/ui/composed/icons`
- Use `cn()` for all className logic
- Use semantic color tokens
- Follow existing variant patterns

### Don'ts ❌

- Never import from `lucide-react` directly
- Don't use raw colors like `bg-gray-900`
- Don't skip the `title` element in custom SVG icons
- Don't create new icon imports without checking if it exists

---

## 🔧 Development Commands

```bash
# Build UI styles
turbo ui#build:styles

# Watch mode for styles
turbo ui#dev:styles

# Type check UI package
turbo ui#typecheck
```
