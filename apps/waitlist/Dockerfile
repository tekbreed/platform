# Dockerfile at repository root
FROM node:22-alpine AS base
RUN apk update && apk add --no-cache libc6-compat

# ============================================
# Pruner Stage: Prune the monorepo
# ============================================
FROM base AS pruner
WORKDIR /app

ARG APP_NAME

# Install turbo
RUN npm install -g turbo@2.5.8

# Copy entire monorepo
COPY . .

# Prune the monorepo for the specific app
RUN turbo prune $APP_NAME --docker

# ============================================
# Installer Stage: Install deps and build
# ============================================
FROM base AS installer
WORKDIR /app

ARG APP_NAME

RUN npm install -g turbo@2.5.8

# Copy pruned lockfiles and package.json files
COPY --from=pruner /app/out/json/ .

# Install dependencies
RUN npm ci

# Copy pruned source code
COPY --from=pruner /app/out/full/ .

# Build the application
RUN turbo run build --filter=${APP_NAME}

# ============================================
# Runner Stage: Production runtime
# ============================================
FROM base AS runner
WORKDIR /app

ARG APP_NAME

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser

# Copy package.json for start script
COPY --from=installer --chown=appuser:nodejs /app/apps/$APP_NAME/package.json ./package.json

# Copy node_modules (production dependencies)
COPY --from=installer --chown=appuser:nodejs /app/node_modules ./node_modules

# Copy the build directory
COPY --from=installer --chown=appuser:nodejs /app/apps/$APP_NAME/build ./build

USER appuser

ENV NODE_ENV=production
ENV PORT=8080

# React Router v7 start command
CMD ["npm", "run", "start"]