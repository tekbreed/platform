# FROM node:22-alpine AS base

# # Builder
# FROM base AS builder
# RUN apk update
# RUN apk add --no-cache libc6-compat

# WORKDIR /app

# RUN npm install -g turbo@2.6.1
# COPY . .

# ARG RAILWAY_SERVICE_NAME
# # Uncomment this line if you want to build a docker image on your local machine 
# # ENV RAILWAY_SERVICE_NAME="web"
 
# RUN turbo prune ${RAILWAY_SERVICE_NAME} --docker

# # Installer
# FROM base AS installer
# RUN apk update
# RUN apk add --no-cache libc6-compat
# WORKDIR /app
 
# COPY --from=builder /app/out/json/ .

# RUN npm ci --legacy-peer-deps
 
# COPY --from=builder /app/out/full/ .

# ENV DATABASE_URL="file:./dev.db"

# RUN npx turbo run build

# # Runner
# FROM base AS runner
# WORKDIR /app

# ARG RAILWAY_SERVICE_NAME

# # Uncomment this line if you want to build a docker image on your local machine 
# # ENV RAILWAY_SERVICE_NAME="web"

# RUN addgroup --system --gid 1001 nodejs && \
#     adduser --system --uid 1001 appuser

# # Install Turso CLI globally
# RUN apk add --no-cache curl bash && \
#     curl -sSfL https://get.tur.so/install.sh | bash && \
#     mv /root/.turso/turso /usr/local/bin/turso && \
#     chmod +x /usr/local/bin/turso

# # Copy application files
# COPY --from=installer --chown=appuser:nodejs /app/apps/${RAILWAY_SERVICE_NAME}/package.json ./package.json
# COPY --from=installer --chown=appuser:nodejs /app/apps/${RAILWAY_SERVICE_NAME}/public ./public
# COPY --from=installer --chown=appuser:nodejs /app/apps/${RAILWAY_SERVICE_NAME}/build ./build

# # Copy database files (prisma, scripts, and generated code)
# COPY --from=installer --chown=appuser:nodejs /app/packages/database ./packages/database

# # Copy node_modules
# COPY --from=installer --chown=appuser:nodejs /app/node_modules ./node_modules

# USER appuser

# ENV NODE_ENV=production
# ENV PORT=8080

# # Run migrations and then start the application
# CMD ["sh", "-c", "node packages/database/scripts/apply-migrations.js && npm run start"]


FROM node:22-slim AS base

# Builder
FROM base AS builder
RUN apt-get update -y && apt-get install -y ca-certificates

WORKDIR /app

RUN npm install -g turbo@2.6.1
COPY . .

ARG RAILWAY_SERVICE_NAME

RUN turbo prune ${RAILWAY_SERVICE_NAME} --docker

# Installer
FROM base AS installer
RUN apt-get update -y && apt-get install -y ca-certificates
WORKDIR /app
 
COPY --from=builder /app/out/json/ .

RUN npm ci --legacy-peer-deps
 
COPY --from=builder /app/out/full/ .

ENV DATABASE_URL="file:./dev.db"

RUN npx turbo run build

# Runner
FROM base AS runner
WORKDIR /app

ARG RAILWAY_SERVICE_NAME

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser

# Install Turso CLI globally
RUN apt-get update -y && apt-get install -y --no-install-recommends curl bash xz-utils && \
    curl -sSfL https://get.tur.so/install.sh | bash && \
    mv /root/.turso/turso /usr/local/bin/turso && \
    chmod +x /usr/local/bin/turso && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy application files
COPY --from=installer --chown=appuser:nodejs /app/apps/${RAILWAY_SERVICE_NAME}/package.json ./package.json
COPY --from=installer --chown=appuser:nodejs /app/apps/${RAILWAY_SERVICE_NAME}/public ./public
COPY --from=installer --chown=appuser:nodejs /app/apps/${RAILWAY_SERVICE_NAME}/build ./build

# Copy database files
COPY --from=installer --chown=appuser:nodejs /app/packages/database ./packages/database

# Copy node_modules
COPY --from=installer --chown=appuser:nodejs /app/node_modules ./node_modules

USER appuser

ENV NODE_ENV=production
ENV PORT=8080

CMD ["sh", "-c", "node packages/database/scripts/apply-migrations.js && npm run start"]
