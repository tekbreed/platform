# Contributing to TekBreed Platform

Thank you for your interest in contributing to TekBreed Platform! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Testing Requirements](#testing-requirements)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)

## 🤝 Code of Conduct

### Our Standards

- **Be respectful**: Treat everyone with respect and kindness
- **Be collaborative**: Work together and help each other
- **Be professional**: Keep discussions focused and constructive
- **Be inclusive**: Welcome contributors of all backgrounds and skill levels

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Trolling, insulting, or derogatory remarks
- Publishing others' private information
- Any conduct that would be inappropriate in a professional setting

## 🚀 Getting Started

### Prerequisites

- Node.js >= 22.0.0
- npm 11.5.1
- Git
- Basic knowledge of TypeScript, React, and React Router

### Initial Setup

1. **Fork the repository** on GitHub

2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/platform.git
   cd platform
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/platform.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Set up environment variables**:
   ```bash
   cp apps/web/.env.example apps/web/.env
   # Edit apps/web/.env with your configuration
   ```

6. **Generate database client**:
   ```bash
   npm run db:generate
   ```

7. **Start development**:
   ```bash
   npm run dev
   ```

## 🔄 Development Workflow

### Branching Strategy

We use a feature branch workflow:

1. **Keep your fork synced**:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

   Branch naming conventions:
   - `feature/` - New features
   - `fix/` - Bug fixes
   - `docs/` - Documentation changes
   - `refactor/` - Code refactoring
   - `test/` - Adding or updating tests
   - `chore/` - Maintenance tasks

3. **Make your changes** and commit regularly

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request** on GitHub

### Working with the Monorepo

This project uses Turborepo and npm workspaces. **Always run commands from the monorepo root.**

- **Run commands for all packages**:
  ```bash
  npm run dev          # Start all apps
  npm run build        # Build all apps
  npm run test         # Run all unit tests (watch mode)
  npm run test:run     # Run all unit tests once (CI mode)
  ```

- **Run commands for specific apps** (use `<app-name>#<task>` syntax):
  ```bash
  turbo <app-name>#dev     # Start specific app dev server
  turbo web#dev            # Example: Start web app
  turbo cms#dev            # Example: Start CMS
  turbo <app-name>#build   # Build specific app
  ```
  
  > [!NOTE]
  > Turborepo handles dependencies automatically. For example, `turbo web#dev` will start CMS first (since web depends on it), then start web.

- **Run commands with filters** (use `--filter=<app>` syntax):
  ```bash
  turbo test:e2e --filter=<app-name>     # Run e2e tests for specific app
  turbo test:e2e --filter=web            # Example: e2e tests for web
  turbo build --filter=@repo/ui          # Build specific package
  turbo typecheck --filter=<app-name>    # Type check specific app
  ```

- **Add dependencies** (from monorepo root):
  ```bash
  # To a specific app
  npm install <package> -w apps/<app-name>
  npm install react-query -w apps/web  # Example
  
  # To a specific package
  npm install <package> -w packages/<package-name>
  npm install clsx -w packages/ui  # Example
  
  # To root (dev dependencies)
  npm install <package> -D
  npm install @types/node -D  # Example
  ```

## 🎨 Code Style

### Linting and Formatting

We use **Biome** for linting and formatting:

- **Check code**:
  ```bash
  npm run format-and-lint
  ```

- **Auto-fix issues**:
  ```bash
  npm run format-and-lint:fix
  ```

**Important**: All code must pass linting before being merged. Husky pre-commit hooks will automatically check your code.

### TypeScript

- **Always use TypeScript** - No `.js` or `.jsx` files
- **Enable strict mode** - All packages use strict TypeScript
- **Type everything** - Avoid `any` types when possible
- **Run type checking**:
  ```bash
  npm run typecheck
  ```

### Code Style Guidelines

1. **Naming Conventions**:
   - Components: `PascalCase` (e.g., `UserProfile.tsx`)
   - Functions/variables: `camelCase` (e.g., `getUserData`)
   - Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`)
   - Files: `kebab-case` for utilities, `PascalCase` for components

2. **Component Structure**:
   ```typescript
   // Imports
   import { useState } from "react"
   import type { User } from "@repo/database"
   
   // Types/Interfaces
   interface UserProfileProps {
     user: User
   }
   
   // Component
   export function UserProfile({ user }: UserProfileProps) {
     // Hooks
     const [isEditing, setIsEditing] = useState(false)
     
     // Event handlers
     const handleEdit = () => {
       setIsEditing(true)
     }
     
     // Render
     return (
       <div>
         {/* Component JSX */}
       </div>
     )
   }
   ```

3. **React Best Practices**:
   - Use functional components with hooks
   - Prefer named exports over default exports
   - Keep components small and focused
   - Extract reusable logic into custom hooks
   - Use React Router loaders for data fetching

4. **Styling**:
   - Use Tailwind CSS utilities
   - Follow the design system in `@repo/ui`
   - Keep inline styles minimal
   - Use semantic class names when needed

## 🧪 Testing Requirements

### Unit Tests

- **Write tests** for all new utilities and business logic
- **Use Vitest** for unit tests
- **Location**: Place tests next to the code or in `__tests__` directories
- **Naming**: `*.test.ts` or `*.spec.ts`

```bash
# Run tests in watch mode (from root)
turbo test

# Run tests once with coverage (from root)
turbo test:run
```

**Coverage Requirements**:
- Aim for at least 80% coverage for new code
- Critical business logic should have 100% coverage

### E2E Tests

- **Write e2e tests** for new user-facing features
- **Use Playwright** for e2e tests
- **Location**: `apps/web/tests/e2e/`
- **Naming**: `*.spec.ts`

```bash
# Run e2e tests for all apps (from root)
turbo test:e2e

# Run e2e tests for web app only (from root)
turbo test:e2e --filter=web

# Run in CI mode
turbo test:e2e:run --filter=web

# Open Playwright UI
turbo test:e2e:ui --filter=web
```

**E2E Test Guidelines**:
- Test critical user flows
- Use realistic test data
- Keep tests independent and isolated
- Use page object pattern for complex pages

### Test Requirements for PRs

- All tests must pass before merging
- New features must include tests
- Bug fixes should include regression tests
- Maintain or improve code coverage

## 📝 Commit Guidelines

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

**Examples**:
```bash
feat(web): add user profile page

fix(database): resolve connection timeout issue

docs: update contributing guidelines

test(web): add e2e tests for authentication flow
```

### Commit Best Practices

- Write clear, descriptive commit messages
- Keep commits focused and atomic
- Reference issues when applicable (e.g., `fixes #123`)
- Use present tense ("add feature" not "added feature")
- Keep the subject line under 72 characters

## 🔀 Pull Request Process

### Before Submitting

1. **Ensure all tests pass**:
   ```bash
   turbo test:run
   turbo test:e2e:run --filter=web
   ```

2. **Run linting and formatting**:
   ```bash
   turbo format-and-lint:fix
   ```

3. **Run type checking**:
   ```bash
   turbo typecheck
   ```

4. **Update documentation** if needed

5. **Rebase on latest main**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

### PR Guidelines

1. **Title**: Use conventional commit format
   - Example: `feat(web): add article bookmarking feature`

2. **Description**: Include:
   - What changes were made
   - Why the changes were necessary
   - How to test the changes
   - Screenshots/videos for UI changes
   - Related issues (e.g., `Closes #123`)

3. **Size**: Keep PRs focused and reasonably sized
   - Large PRs should be split into smaller ones
   - Each PR should address a single concern

4. **Review**: 
   - Address all review comments
   - Request re-review after making changes
   - Be responsive and respectful

### PR Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test these changes

## Screenshots (if applicable)
Add screenshots or videos

## Checklist
- [ ] Tests pass locally
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Added tests for new features
```

### Review Process

1. **Automated checks** must pass (CI/CD)
2. **Code review** by at least one maintainer
3. **Testing** by reviewer if needed
4. **Approval** required before merging
5. **Squash and merge** is preferred

## 📂 Project Structure

### Key Directories

```
platform/
├── apps/
│   ├── web/              # Main web app
│   │   ├── src/
│   │   │   ├── routes/  # Route components
│   │   │   ├── components/ # React components
│   │   │   └── utils/   # Utilities
│   │   └── tests/       # Tests
│   └── cms/             # Sanity Studio
├── packages/
│   ├── database/        # Prisma schema & client
│   ├── ui/              # Shared components
│   └── utils/           # Shared utilities
└── docs/                # Documentation
```

### Adding New Features

1. **New route**: Add to `apps/web/src/routes/`
2. **New component**: Add to `apps/web/src/components/` or `packages/ui/src/`
3. **New utility**: Add to `apps/web/src/utils/` or `packages/utils/src/`
4. **Database changes**: Update `packages/database/prisma/schema.prisma`

## 🆘 Getting Help

- **Documentation**: Check the [README](./README.md) and app-specific docs
- **Issues**: Search existing issues or create a new one
- **Discussions**: Use GitHub Discussions for questions
- **Code Review**: Ask for help in your PR

## 📜 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to TekBreed Platform! 🎉
