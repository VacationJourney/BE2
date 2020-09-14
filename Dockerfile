FROM node:12

WORKDIR /app

COPY . ./

RUN npm install
RUN docker-compose up -d

CMD "npm run start"
