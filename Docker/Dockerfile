FROM node:23-alpine

WORKDIR /app

ARG APP_DIR=synccalender_g_to_g_ts

COPY ${APP_DIR}/package*.json ./
RUN npm ci

EXPOSE 3000
CMD ["npm", "run", "dev"]
