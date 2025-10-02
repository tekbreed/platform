# Base image
FROM node:22-alpine AS base
WORKDIR /app

# Copy minimal lockfiles first (better layer caching)
COPY ./out/json/package.json ./package.json
COPY ./out/json/package-lock.json ./package-lock.json

# Install dependencies (production by default, devs skipped later if needed)
RUN npm ci --ignore-scripts

# Copy actual pruned app files
COPY ./out/full/ ./

# Build app inside Docker (workspace context provided by prune)
# You’ll pass APP_NAME as a build arg
ARG APP_NAME
RUN npm run build --workspace=apps/$APP_NAME

# Generate Prisma client if your app uses it
# RUN npx prisma generate

# Default startup command
CMD ["npm", "run", "start"]
