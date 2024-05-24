FROM node:alpine
WORKDIR /app

ARG NODE_ENV=production
COPY ./package*.json ./

RUN npm set strict-ssl false
RUN npm install

COPY ./dist dist/

CMD ["npm", "run", "server"]
