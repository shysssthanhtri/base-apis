# Base
FROM node:alpine as base
WORKDIR /usr/src/app
COPY ./package*.json .

# Builder
FROM base as builder
RUN npm ci
COPY . .
RUN npm run build

# Production
FROM base as production
COPY --from=builder /usr/src/app/dist ./dist
RUN npm ci --production

EXPOSE 3000

CMD ["npm", "start"]
