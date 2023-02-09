FROM node:latest

WORKDIR /home/node/back-end-app

COPY package.json .
COPY yarn.lock .
COPY . .

EXPOSE $PORT

# to run additinal scripts and commands
# RUN apt-get update && \ 
#   apt-get -y dist-upgrade

VOLUME [ "/home/node/back-end-app" ]
