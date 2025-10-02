# This Dockerfile is adapted from the official Turborepo example
# https://github.com/vercel/turborepo/tree/main/examples/with-docker

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

# Prune the monorepo for the specific app
# Replace 'waitlist' with build arg to make it dynamic
ARG APP_NAME=waitlist
RUN turbo prune ${APP_NAME} --docker

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

# Build the app
ARG APP_NAME=waitlist
RUN npx turbo run build --filter=${APP_NAME}

# ========================================
# Stage 3: Production runner
# ========================================
FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

# Copy necessary files
ARG APP_NAME=waitlist

# Copy package files
COPY --from=installer /app/package.json ./package.json
COPY --from=installer /app/package-lock.json ./package-lock.json

# Copy node_modules (production dependencies)
COPY --from=installer --chown=nodejs:nodejs /app/node_modules ./node_modules

# Copy the built application
# Adjust the path based on your build output (dist or build)
COPY --from=installer --chown=nodejs:nodejs /app/apps/${APP_NAME}/dist ./apps/${APP_NAME}/build
COPY --from=installer --chown=nodejs:nodejs /app/apps/${APP_NAME}/package.json ./apps/${APP_NAME}/package.json

# If you have shared packages, copy them too
COPY --from=installer --chown=nodejs:nodejs /app/packages ./packages

USER nodejs

# Set working directory to the specific app
WORKDIR /app/apps/${APP_NAME}

# Expose port (adjust as needed)
EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

# Start the application
# Adjust based on your start command
CMD ["node", "dist/index.js"]