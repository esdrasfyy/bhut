FROM node:22.11.0

WORKDIR /server

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "start"]