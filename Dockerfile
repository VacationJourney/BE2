FROM node:12

WORKDIR /app

COPY . ./

RUN npm install

CMD "docker-compose up -d"
