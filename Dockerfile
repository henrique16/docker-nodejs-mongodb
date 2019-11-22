FROM node:alpine

WORKDIR /usr/src/app-nodejs-mongodb

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]