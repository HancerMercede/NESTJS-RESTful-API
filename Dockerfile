#Building  Layer
FROM node:16-alpine as  development

WORKDIR /app

COPY tsconfig*.json ./
COPY package*.json ./
COPY nest-cli*.json ./


RUN npm ci

COPY src/ src/

RUN npm run build

#Rubtine (Production) layer
FROM node:16-alpine as production

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=development /app/dist ./dist/

EXPOSE 3000

CMD ["node", "dist/main.js"]