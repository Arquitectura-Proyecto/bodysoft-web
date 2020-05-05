FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g serve

COPY . .

CMD ["serve","-s","build","-l","4000"]