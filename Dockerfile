FROM node:12.16.1 as build

RUN mkdir /app
WORKDIR /app
COPY ./package.json /app
COPY ./yarn.lock /app
RUN yarn
ADD . /app
RUN yarn build

FROM nginx:1.17-alpine
COPY --from=build /app/build/ /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
