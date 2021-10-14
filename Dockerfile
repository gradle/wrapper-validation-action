FROM node:12-slim

WORKDIR /app

COPY . .

RUN npm install && npm run-script build && npm install -g

ENTRYPOINT [ "wrapper-validation" ]
