FROM node:alpine

WORKDIR /prod

COPY ./package.json .
RUN npm install --omit=dev

COPY . .

CMD [ "npm", "start" ]