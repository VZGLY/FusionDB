FROM node:24 AS build
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
WORKDIR /src
COPY . .
RUN npm i
RUN npm run build

FROM nginx:alpine3.22
WORKDIR /usr/share/nginx/html
COPY --from=build /src/build .
EXPOSE 80