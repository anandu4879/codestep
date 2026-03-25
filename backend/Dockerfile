#stage-1
FROM node:18-alpine AS deps
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

#stage-2
FROM node:18-alpine AS runtime
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=deps /app/node_modules ./node_modules
COPY src/ ./src/
COPY package*.json ./
RUN chown -R appuser:appgroup /app
USER appuser
EXPOSE 5001
CMD ["node", "src/server.js"]