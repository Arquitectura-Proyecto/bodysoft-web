FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g serve

COPY /build ./

CMD ["serve","-s","-l","3000"]