# Base image
FROM node:22-alpine AS base
WORKDIR /app

ARG APP_NAME

# Copy minimal lockfiles first (better layer caching)
COPY json/apps/${APP_NAME}/package.json ./package.json
COPY json/package-lock.json ./package-lock.json

# Install dependencies (production by default, dev skipped if needed)
RUN npm ci --ignore-scripts --omit=dev

# Copy actual pruned app files
COPY full/ ./

# Build app inside Docker (workspace context provided by prune)
# APP_NAME must be passed as a build arg in the CI/CD step
ARG APP_NAME
RUN npm run build --workspace=apps/${APP_NAME}

# If your app uses Prisma, uncomment this
# RUN npx prisma generate

# Default startup command
CMD ["npm", "run", "start"]
