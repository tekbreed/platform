# @repo/ui

Shared UI component library for TekBreed Platform, built with React, Radix UI, and Tailwind CSS.

## 📦 Overview

This package provides reusable React components, hooks, and utilities used across all apps in the monorepo. It includes a comprehensive design system with components built on Radix UI primitives and styled with Tailwind CSS.

## 🎨 What's Included

- **Components**: Base UI components (Button, Input, Dialog, etc.)
- **Composed Components**: Complex, composed components (Forms, Icons, etc.)
- **Email Components**: React Email templates
- **Hooks**: Reusable React hooks
- **Utilities**: Helper functions and utilities
- **Styles**: Global CSS and Tailwind configuration

## 📥 Installation

This package is automatically available in the monorepo workspace. Import components in your app:

```tsx
import { Button } from "@repo/ui/components/button"
import { Input } from "@repo/ui/components/input"
import { Icons } from "@repo/ui/composed/icons"
```

## 🔧 Development

### Build Styles

From the monorepo root:

```bash
# Build styles once
turbo ui#build:styles

# Watch mode (development)
turbo ui#dev:styles
```

### Type Checking

```bash
turbo ui#typecheck
```

## 📁 Package Structure

```
packages/ui/
├── src/
│   ├── components/       # Base UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── composed/         # Complex composed components
│   │   ├── icons.tsx
│   │   ├── form-error.tsx
│   │   └── ...
│   ├── email/            # Email templates
│   ├── hooks/            # React hooks
│   ├── lib/              # Utilities
│   │   └── utils.ts
│   └── styles/           # Global styles
│       ├── globals.css
│       └── fonts.css
├── dist/                 # Built CSS files
└── package.json
```

## 🎯 Exports

The package exports the following modules:

```json
{
  "./globals.css": "./dist/globals.css",
  "./fonts.css": "./src/styles/fonts.css",
  "./lib/*": "./src/lib/*.ts",
  "./components/*": "./src/components/*.tsx",
  "./composed/*": "./src/composed/*.tsx",
  "./email/*": "./src/email/*.tsx",
  "./hooks/*": "./src/hooks/*.ts"
}
```

## 🧩 Key Components

### Base Components (Radix UI)
- Accordion, Alert Dialog, Avatar
- Button, Checkbox, Dialog
- Dropdown Menu, Input, Label
- Select, Separator, Slider
- Switch, Tabs, Tooltip
- And many more...

### Composed Components
- **Icons**: Centralized icon components
- **Form Error**: Form error display
- **Subscription Forms**: Newsletter subscription forms

### Email Components
- Built with React Email
- Transactional email templates

## 🎨 Styling

Components are styled with:
- **Tailwind CSS v4**: Utility-first CSS framework
- **class-variance-authority**: Component variants
- **tailwind-merge**: Merge Tailwind classes
- **Radix UI**: Unstyled, accessible primitives

## 📚 Key Dependencies

- **React**: ^19.1.1
- **Radix UI**: Complete set of primitives
- **Tailwind CSS**: ^4.1.13
- **Lucide React**: Icon library
- **Framer Motion**: Animation library
- **Tiptap**: Rich text editor
- **Mermaid**: Diagram rendering
- **Sandpack**: Code playground

## 🔗 Usage Example

```tsx
import { Button } from "@repo/ui/components/button"
import { Input } from "@repo/ui/components/input"
import { Icons } from "@repo/ui/composed/icons"
import { cn } from "@repo/ui/lib/utils"

export function MyComponent() {
  return (
    <div className={cn("flex gap-4")}>
      <Input placeholder="Enter text..." />
      <Button>
        <Icons.check className="mr-2" />
        Submit
      </Button>
    </div>
  )
}
```

## 🔗 Related Documentation

- [Root README](../../README.md)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
