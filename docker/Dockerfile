FROM node:16.10.0-alpine

##copy index file over
RUN mkdir /my-app
COPY ./dist/client ./my-app/

##node
RUN mkdir /node-app
WORKDIR /node-app

COPY ./node_modules ./node_modules
COPY ./server/server.js ./

CMD ["node", "server.js"]
