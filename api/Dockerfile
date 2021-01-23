FROM node:fermium

WORKDIR /home/app/node

COPY package.json yarn.lock ./
RUN yarn
COPY . .

CMD yarn ts-node ./src/app.ts
