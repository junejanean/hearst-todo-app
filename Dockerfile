FROM node:lts-alpine

WORKDIR /var/www

ARG PORT=3001

ENV APP_NAME=resin-cms-interview \
    PORT=$PORT

COPY package*.json ./

RUN npm ci --prefer-offline

COPY . .

RUN npm run build

CMD ["npm", "start", "--", "-p", "$PORT"]
