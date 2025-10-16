FROM node:trixie-slim AS build

ARG REACT_APP_API_URL

ENV REACT_APP_API_URL=$REACT_APP_API_URL

WORKDIR /src

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine3.21-slim

COPY --from=build /src/build /usr/share/nginx/html

EXPOSE 80