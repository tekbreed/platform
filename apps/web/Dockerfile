FROM node:22-alpine AS base

# Builder
FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app

RUN npm install -g turbo@2.6.1
COPY . .

# ARG RAILWAY_SERVICE_NAME
# For Dev
ENV RAILWAY_SERVICE_NAME="web"
 
RUN turbo prune ${RAILWAY_SERVICE_NAME} --docker

# Installer
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
 
COPY --from=builder /app/out/json/ .

RUN npm ci --legacy-peer-deps
 
COPY --from=builder /app/out/full/ .

RUN npx turbo run build
 

# Runner
FROM base AS runner
WORKDIR /app

# ARG RAILWAY_SERVICE_NAME
# For Dev
ENV RAILWAY_SERVICE_NAME="web"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser

USER appuser

COPY --from=installer --chown=appuser:nodejs /app/apps/${RAILWAY_SERVICE_NAME}/package.json ./package.json
COPY --from=installer --chown=appuser:nodejs /app/apps/${RAILWAY_SERVICE_NAME}/public ./public
COPY --from=installer --chown=appuser:nodejs /app/apps/${RAILWAY_SERVICE_NAME}/build ./build
COPY --from=installer --chown=appuser:nodejs /app/node_modules ./node_modules

ENV NODE_ENV=production
ENV PORT=8080

CMD ["npm", "run", "start"]

