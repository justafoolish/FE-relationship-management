FROM node:16.15.0-alpine as dependencies
RUN apk add --update --no-cache python3 make gcc libsass g++
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn run build

FROM nginx:1.17.10-alpine as final
WORKDIR /app
COPY --from=dependencies /app/build /usr/share/nginx/html
RUN apk add nano && apk add curl
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 3000