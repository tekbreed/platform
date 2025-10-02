# This Dockerfile is adapted from the official Turborepo example
# https://github.com/vercel/turborepo/tree/main/examples/with-docker
# Designed to be placed at: apps/waitlist/Dockerfile

FROM node:22-alpine AS base

# ========================================
# Stage 1: Prune the monorepo
# ========================================
FROM base AS pruner
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

# Install turbo globally
RUN npm install -g turbo

# Copy the entire monorepo
COPY . .

# Prune the monorepo for waitlist app only
RUN turbo prune waitlist --docker

# ========================================
# Stage 2: Install dependencies
# ========================================
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

# First install the dependencies (leveraging Docker layer caching)
# Copy only the pruned lockfile and package.json files
COPY --from=pruner /app/out/json/ .

# Install dependencies
RUN npm ci

# Copy pruned source code and build
COPY --from=pruner /app/out/full/ .

# Build the waitlist app
RUN npx turbo run build --filter=waitlist

# ========================================
# Stage 3: Production runner
# ========================================
FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

# Copy package files
COPY --from=installer /app/package.json ./package.json
COPY --from=installer /app/package-lock.json ./package-lock.json

# Copy node_modules
COPY --from=installer --chown=nodejs:nodejs /app/node_modules ./node_modules

# Copy the built waitlist app
COPY --from=installer --chown=nodejs:nodejs /app/apps/waitlist/build ./apps/waitlist/build
COPY --from=installer --chown=nodejs:nodejs /app/apps/waitlist/package.json ./apps/waitlist/package.json

# Copy shared packages if they exist
COPY --from=installer --chown=nodejs:nodejs /app/packages ./packages

USER nodejs

# Set working directory to waitlist app
WORKDIR /app/apps/waitlist

# Expose port
EXPOSE 8080

ENV NODE_ENV=production
ENV PORT=8080

# Start the application
CMD ["npm", "run", "start"]