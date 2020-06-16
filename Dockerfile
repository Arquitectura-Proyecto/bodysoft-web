FROM node:12.18.0-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g serve

COPY /build ./

CMD ["serve","-s","-l","3000"]