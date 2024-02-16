# Use the official MongoDB image from Docker Hub
FROM node:current-alpine3.19

WORKDIR /node

COPY package*.json ./

RUN npm i --production

COPY . .

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD curl --fail http://localhost:3000/health || exit 1

CMD [ "npm", "start" ]