# FROM node:22-bookworm-slim AS development-dependencies-env
# COPY . /app
# WORKDIR /app
# RUN npm ci

# FROM node:22-alpine AS production-dependencies-env
# COPY package.json package-lock.json /app/
# WORKDIR /app
# RUN npm ci --omit=dev

# FROM node:22-alpine AS build-env
# COPY . /app/
# COPY --from=development-dependencies-env /app/node_modules /app/node_modules
# WORKDIR /app
# RUN npm run build

# FROM node:22-alpine
# COPY package.json package-lock.json /app/
# COPY --from=production-dependencies-env /app/node_modules /app/node_modules
# COPY --from=build-env /app/build /app/build
# WORKDIR /app
# CMD ["npm", "run", "start"]

FROM node:22-bookworm-slim AS development-dependencies-env
# Copy monorepo root files
COPY ../../package.json ../../package-lock.json /app/
COPY ../../turbo.json /app/
# Copy all workspace packages
COPY ../../packages /app/packages
COPY ../../apps /app/apps
WORKDIR /app
RUN npm ci

FROM node:22-alpine AS production-dependencies-env
# Copy monorepo root files
COPY ../../package.json ../../package-lock.json /app/
COPY ../../turbo.json /app/
# Copy necessary workspace packages
COPY ../../packages /app/packages
COPY ../../apps/waitlist /app/apps/waitlist
WORKDIR /app
RUN npm ci --omit=dev

FROM node:22-alpine AS build-env
# Copy everything for build
COPY ../../package.json ../../package-lock.json /app/
COPY ../../turbo.json /app/
COPY ../../packages /app/packages
COPY ../../apps /app/apps
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
# Build the specific app using turbo
RUN npx turbo run build --filter=waitlist

FROM node:22-alpine
# Copy only what's needed for runtime
COPY ../../package.json ../../package-lock.json* /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/apps/waitlist/build /app/apps/waitlist/build
# OR if build output is in dist:
# COPY --from=build-env /app/apps/waitlist/dist /app/apps/waitlist/dist
WORKDIR /app/apps/waitlist
CMD ["npm", "run", "start"]