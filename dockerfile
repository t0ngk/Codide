FROM node:18.16-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpx prisma generate && pnpm run build

FROM node:18.16-alpine AS production
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --production
COPY --from=build ./app/build .
COPY --from=build ./app/node_modules ./node_modules
COPY --from=build ./app/prisma ./prisma

EXPOSE 3000:3000
CMD [ "npm", "run", "start" ]

