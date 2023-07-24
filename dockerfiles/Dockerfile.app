FROM node:18-alpine

WORKDIR /home/app

COPY package*.json ./

COPY packages/app ./packages/app

RUN npm --only-prod --ignore-scripts install
RUN npm run install:app

COPY packages/app/.env ./packages/app/.env
COPY packages/server/orm/schema.prisma ./packages/server/orm/schema.prisma
COPY .prettierrc ./