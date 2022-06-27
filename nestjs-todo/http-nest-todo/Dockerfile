FROM node:latest

WORKDIR /home/node/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE $PORT

RUN apt-get update && \ 
  apt-get -y dist-upgrade

VOLUME [ "/home/node/app" ]
