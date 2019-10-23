# ---------------BUILD---------------
FROM node:12 as build-stage

# enviroment
WORKDIR /app
ENV NODE_OPTIONS=--max_old_space_size=4096
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# dependencies (only .json / .lock -> docker cache)
COPY *.json ./
COPY yarn.lock .
RUN yarn install


# prepare sourcefiles
COPY . .

# build albatross
WORKDIR /app/
RUN yarn build

# ---------------PROD---------------
FROM node:12-alpine as production-stage
ENV  NODE_ENV production
EXPOSE 3000
USER node

COPY --from=build-stage /app/node_modules /app/node_modules

# copy runtime code for albatross
COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/*.json /app/
# COPY --from=build-stage /app/*.env /app/

WORKDIR /app/
CMD ["node", "dist/main.js"]
