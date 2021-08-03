FROM node:16-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build


FROM nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 3000


