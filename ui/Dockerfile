FROM node:fermium

WORKDIR /home/app/node

COPY package.json package-lock.json ./
RUN npm install
COPY . .

CMD npx ng serve --host=0.0.0.0
