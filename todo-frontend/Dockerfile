FROM node:16-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build


FROM nginx:latest
COPY --from=build /usr/src/app/build /usr/share/nginx/html
# RUN apt-get update \
#  && apt-get install -y --no-install-recommends \
#       apache2-utils \
#  && rm -rf /var/lib/apt/lists/*
# RUN htpasswd -c -b /usr/.htpasswd admin admin
EXPOSE 3000


