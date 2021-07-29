FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . /usr/src/app
RUN yarn run build
CMD [ "yarn", "run", "start:prod"]