# @repo/typescript-config

Shared TypeScript configurations for TekBreed Platform.

## 📦 Overview

This package provides shared TypeScript configuration files used across all apps and packages in the monorepo. It ensures consistent TypeScript settings and compiler options throughout the project.

## 🎯 What's Included

- Base TypeScript configuration
- React-specific TypeScript configuration
- Node.js-specific TypeScript configuration
- Strict mode configurations

## 📥 Installation

This package is automatically available in the monorepo workspace. Extend the configuration in your app's `tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    // App-specific overrides
  }
}
```

## 📁 Package Structure

```
packages/typescript-config/
├── base.json             # Base TypeScript config
├── react.json            # React-specific config
├── node.json             # Node.js-specific config
└── package.json
```

## 🔧 Available Configurations

### Base Configuration

For general TypeScript projects:

```json
{
  "extends": "@repo/typescript-config/base.json"
}
```

### React Configuration

For React applications:

```json
{
  "extends": "@repo/typescript-config/react.json"
}
```

### Node Configuration

For Node.js applications:

```json
{
  "extends": "@repo/typescript-config/node.json"
}
```

## ⚙️ Configuration Features

- **Strict Mode**: Enabled for type safety
- **ES Modules**: Modern module system
- **Path Mapping**: Configured for monorepo
- **JSX**: React JSX support
- **Source Maps**: Enabled for debugging
- **Declaration Files**: Generated for libraries

## 🔗 Usage Example

In your app's `tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/react.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## 🔗 Related Documentation

- [Root README](../../README.md)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
