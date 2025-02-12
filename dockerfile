FROM node:22.11.0

WORKDIR /server

COPY . .

RUN npm install --legacy-peer-deps

RUN npm run build

CMD ["npm", "start"]