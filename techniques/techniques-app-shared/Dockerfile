FROM node:16

WORKDIR /home/node/nestjs_shared_app

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3048
EXPOSE 3030


RUN apt-get update && \ 
  apt-get -y dist-upgrade && \
  apt-get install -y postgresql-client && \
  sh -c 'env' && \
  chmod 755 entrypoint.sh

# only build and run from docker-compose command
CMD [ "npm", "run", "build" ]
