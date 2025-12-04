# CMS (Sanity Studio)

Content Management System for TekBreed Platform, built with Sanity Studio.

## 🎯 Overview

This is a Sanity Studio application that provides a headless CMS for managing content across the TekBreed Platform. It includes custom schema types, plugins, and configurations for content editing.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 22.0.0
- npm 11.5.1
- Sanity account and project

### Development

**Always run commands from the monorepo root using Turborepo.**

Start the CMS development server:

```bash
turbo cms#dev
```

The Sanity Studio will be available at `http://localhost:3333` (default Sanity port).

> [!NOTE]
> The CMS app is automatically started as a dependency when running `turbo web#dev`, as configured in the root `turbo.json`.

## 📜 Available Scripts

**Run from the monorepo root:**

| Command | Description |
|---------|-------------|
| `turbo cms#dev` | Start Sanity Studio development server |
| `turbo cms#build` | Build Sanity Studio for production |
| `turbo cms#start` | Start production Sanity Studio |
| `turbo cms#deploy` | Deploy Sanity Studio to Sanity hosting |
| `turbo cms#deploy-graphql` | Deploy GraphQL API |

## 📁 Project Structure

```
apps/cms/
├── schemaTypes/          # Content schema definitions
│   ├── article.ts       # Article schema
│   ├── author.ts        # Author schema
│   └── ...              # Other schemas
├── static/              # Static assets
├── sanity.config.ts     # Sanity Studio configuration
├── sanity.cli.ts        # Sanity CLI configuration
└── package.json
```

## 🔧 Configuration

### Environment Variables

Sanity configuration is managed through environment variables in the root `.env` file:

- `SANITY_STUDIO_PROJECT_ID`: Your Sanity project ID
- `SANITY_STUDIO_DATASET`: Dataset name (e.g., "development", "production")

### Schema Types

Schema types are defined in the `schemaTypes/` directory. Each schema defines the structure of a content type (articles, authors, etc.).

## 🔌 Plugins

This CMS includes:

- **@sanity/vision**: Query testing and debugging
- **@sanity/code-input**: Code input fields
- **sanity-plugin-markdown**: Markdown editor support

## 🚢 Deployment

Deploy to Sanity hosting:

```bash
turbo cms#deploy
```

Deploy GraphQL API:

```bash
turbo cms#deploy-graphql
```

## 📚 Key Dependencies

- **sanity**: ^4.18.0 - Sanity Studio core
- **@sanity/vision**: ^4.18.0 - Query testing tool
- **@sanity/code-input**: ^6.0.3 - Code input fields
- **sanity-plugin-markdown**: ^6.0.0 - Markdown editor
- **react**: ^19.1 - React library
- **styled-components**: ^6.1.18 - Styling

## 🔗 Related Documentation

- [Root README](../../README.md)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Studio Documentation](https://www.sanity.io/docs/sanity-studio)

## 💡 Tips

- Use the Vision plugin to test GROQ queries
- Schema changes require restarting the dev server
- Content is stored in Sanity's cloud, not locally
- Use datasets to separate development and production content