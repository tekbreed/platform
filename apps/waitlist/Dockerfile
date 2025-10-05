# Dockerfile at repository root
FROM node:22-slim AS base
FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app

RUN npm install -g turbo@2.5.8
COPY . .

ARG RAILWAY_SERVICE_NAME
 
RUN turbo prune ${RAILWAY_SERVICE_NAME} --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
 
COPY --from=builder /app/out/json/ .
RUN npm ci
 
COPY --from=builder /app/out/full/ .
RUN npx turbo run build
 
FROM base AS runner
WORKDIR /app

ARG RAILWAY_SERVICE_NAME

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser

USER appuser

COPY --from=installer --chown=appuser:nodejs /app/apps/${RAILWAY_SERVICE_NAME}/package.json ./package.json
COPY --from=installer --chown=appuser:nodejs /app/apps/${RAILWAY_SERVICE_NAME}/public ./public
COPY --from=installer --chown=appuser:nodejs /app/apps/${RAILWAY_SERVICE_NAME}/build ./build
COPY --from=installer --chown=appuser:nodejs /app/node_modules ./node_modules

ENV NODE_ENV=production
ENV PORT=8080

# WORKDIR /app

CMD ["npm", "run", "start"]