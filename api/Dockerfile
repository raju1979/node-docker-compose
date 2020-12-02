FROM node:alpine

RUN addgroup -g 1001 -S appuser && adduser -u 1001 -S appuser  -G appuser

RUN apk update && apk add bash 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

COPY . .