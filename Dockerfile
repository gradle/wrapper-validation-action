FROM node:12-slim

ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN npm install && npm run-script build && npm install -g

ENTRYPOINT [ "wrapper-validation"]
