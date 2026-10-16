# Scenox Commerce: production image. Secrets are NOT baked in: they come from
# the env file at runtime (see docker-compose.yml and docs/DEPLOY.md).

FROM node:24-bookworm-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
# Values the browser bundle needs at build time. Only a yes/no for the chat
# button; the analytics IDs are public by design.
ARG CHAT_ENABLED=1
ARG NEXT_PUBLIC_GA_ID=
ARG NEXT_PUBLIC_META_PIXEL_ID=
ENV CHAT_ENABLED=$CHAT_ENABLED NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID NEXT_PUBLIC_META_PIXEL_ID=$NEXT_PUBLIC_META_PIXEL_ID
RUN npm run build && npm prune --omit=dev --no-audit --no-fund

FROM node:24-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
COPY --from=build --chown=node:node /app/package.json /app/next.config.ts ./
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/public ./public
COPY --from=build --chown=node:node /app/src/content ./src/content
COPY --from=build --chown=node:node /app/src/assets/fonts ./src/assets/fonts
COPY --from=build --chown=node:node /app/.next ./.next
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/robots.txt').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "node_modules/next/dist/bin/next", "start"]
