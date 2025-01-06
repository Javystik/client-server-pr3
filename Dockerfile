FROM node:22 AS development

WORKDIR /srv/node/app

COPY package*.json ./
RUN npm install

RUN npm install -g nodemon

COPY . .

RUN chown -R node /srv/node/app

USER node

EXPOSE 3000

EXPOSE 9229

ENV NODE_ENV=development

CMD ["nodemon", "--inspect=0.0.0.0:9229", "server.js"]