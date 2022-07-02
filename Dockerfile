FROM node:16 AS ui-build
WORKDIR /usr/src/app
COPY client/ ./client/
COPY package*.json ./client/
RUN cd client && npm install --force @angular/cli && npm install --force && npm run build


FROM node:10 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/client/dist ./client/dist

RUN npm install --force
COPY server.js .
EXPOSE 3080

CMD ["node", "server.js"]