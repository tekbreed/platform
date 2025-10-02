# # Reference: https://github.com/vercel/turborepo/tree/main/examples/with-docker

# FROM node:22-alpine AS base

# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat

# # ========================================
# # Stage 1: Prune the monorepo
# # ========================================
# FROM base AS pruner

# WORKDIR /app

# # Install turbo globally
# RUN npm install -g turbo@latest

# # First copy only the files needed to install dependencies
# # This leverages Docker layer caching
# COPY . .
# RUN turbo prune waitlist --docker

# # ========================================
# # Stage 2: Install dependencies and build
# # ========================================
# FROM base AS installer

# WORKDIR /app

# # First install dependencies (based on pruned package.json files)
# COPY --from=pruner /app/out/json/ .
# COPY --from=pruner /app/out/package-lock.json ./package-lock.json
# RUN npm ci

# # Copy the rest of the pruned source code
# COPY --from=pruner /app/out/full/ .

# # Build the project
# RUN npx turbo run build --filter=waitlist...

# # ========================================
# # Stage 3: Production runner
# # ========================================
# FROM base AS runner

# WORKDIR /app

# # Don't run production as root
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nodejs

# # Copy built application and node_modules
# COPY --from=installer /app/package.json ./package.json
# COPY --from=installer --chown=nodejs:nodejs /app/apps/waitlist/ ./apps/waitlist/
# COPY --from=installer --chown=nodejs:nodejs /app/node_modules ./node_modules

# # If you have shared packages, copy them too
# COPY --from=installer --chown=nodejs:nodejs /app/packages ./packages

# USER nodejs

# # Set working directory to waitlist app
# WORKDIR /app/apps/waitlist

# EXPOSE 8080

# ENV NODE_ENV=production
# ENV PORT=8080

# CMD ["npm", "run", "start"]

FROM node:22-alpine

WORKDIR /app
COPY --chown=node:node . .
RUN npm ci --omit=dev

CMD ["npm", "run", "start"]

