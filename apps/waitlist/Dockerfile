# This Dockerfile will be copied to out/ by the workflow
FROM node:22-alpine AS base
RUN apk update && apk add --no-cache libc6-compat

# ============================================
# Installer Stage: Install deps and build
# ============================================
FROM base AS installer
WORKDIR /app

ARG APP_NAME

RUN npm install -g turbo@2.5.8

COPY json/ .
RUN npm ci

COPY full/ .
RUN npx turbo run build --filter=${APP_NAME}

# ============================================
# Runner Stage: Production runtime
# ============================================
FROM base AS runner
WORKDIR /app

ARG APP_NAME

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser

# Copy package.json for start script
COPY --from=installer --chown=appuser:nodejs /app/apps/${APP_NAME}/package.json ./package.json

# Copy node_modules (React Router v7 needs minimal deps at runtime)
COPY --from=installer --chown=appuser:nodejs /app/node_modules ./node_modules

# Copy the complete build directory
COPY --from=installer --chown=appuser:nodejs /app/apps/${APP_NAME}/build ./build

USER appuser

ENV NODE_ENV=production
ENV PORT=8080

CMD ["npm", "run", "start"]