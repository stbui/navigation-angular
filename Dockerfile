FROM node:latest

WORKDIR /navigation

COPY package.json /navigation
RUN npm install
COPY . /navigation

RUN npm run compile


CMD ["node", "www/production.js"]
#CMD ["npm","run","start"]

EXPOSE 8360