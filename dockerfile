FROM oven/bun:1 AS base

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

# Production image
FROM oven/bun:1

WORKDIR /app

COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./
COPY --from=base /app/next.config.ts ./

EXPOSE 3000

CMD ["bun", "run", "start"]
