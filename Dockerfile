FROM node:0.12

RUN npm install -g browser-sync

RUN mkdir -p /code/public/

WORKDIR /code/public/
