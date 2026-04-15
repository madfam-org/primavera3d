# PRIMAVERA3D - Production Dockerfile
# Single builder stage with full pnpm install for standalone compatibility.
# Matches the working Coforma/Rondelio pattern.

FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@9 --activate

# Copy workspace config and all package.json files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/web/package.json ./apps/web/
COPY packages/ ./packages/

# Full install (not filtered) — standalone tracer needs the complete .pnpm store
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/web/ ./apps/web/
COPY tsconfig.json ./

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the web app
RUN pnpm --filter web build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone output (includes node_modules/.pnpm, apps/web/server.js)
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

USER nextjs

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

CMD ["node", "apps/web/server.js"]
