# build stage
FROM node:12-alpine as build-stage

WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY . .

WORKDIR /app
RUN npm i

RUN npm run build:prod

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist/frontend /usr/share/nginx/html
# COPY --from=build-stage /app /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]