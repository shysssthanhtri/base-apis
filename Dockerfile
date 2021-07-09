# Base
FROM node:alpine as base
WORKDIR /app/remote-config-server
COPY ./package*.json .

# Builder
FROM base as builder
RUN npm ci
COPY . .
RUN npm run build

# Production
FROM base as production
COPY --from=builder /app/remote-config-server/dist ./dist
RUN npm ci --production

EXPOSE 3000

CMD ["npm", "start"]
