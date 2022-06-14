FROM node:16

WORKDIR /home/node/nestjs_shared_app

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3048
EXPOSE 3030

#envirionment vars for web app and migration script
ENV PORT=3048
ENV PROXY_PORT=3030
# 
ENV MULTER_DEST='./uploads'
ENV AWS_REGION='eu-central-1'
ENV BUCKET_NAME='serhii-admin-tutorial-bucket'
ENV IMAGES_PUBLIC_BUCKET='images-public-bucket'
ENV IAM_USER_KEY_ID='AKIAYOX5MXKIQOJD4JKD'
ENV IAM_USER_SECRET_ACCESS_KEY='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'
# 
ENV PG_DB_HOST='postgress_db'
ENV PG_DB_PORT=5432
ENV PG_DB_USERNAME='postgres'
ENV PG_DB_PASSWORD='postgres'
ENV PG_DB_DATABASE='dev'
# 
ENV REDIS_HOST='redis_cache'
ENV REDIS_PORT=6379
# 
ENV SESSION_KEY='NgkmVQ71_zKkGbph7ywKpaVz9iEhf7dv'
# 
ENV GOOGLE_CLIENT_ID='64354824849-vq4ld6pgbhls3ka237fuu9d79qq6btiv.apps.googleusercontent.com'
ENV GOOGLE_CLIENT_SECRET='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'
ENV UV_THREADPOOL_SIZE=128

# make file executable
RUN chmod 755 entrypoint.sh

# conditionally do migration (npm run migrate:prod) and start 
ENTRYPOINT ./entrypoint.sh $migrateDevArg
