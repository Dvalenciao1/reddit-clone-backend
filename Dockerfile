FROM node:latest
WORKDIR /reddit
COPY ./package.json /
RUN npm install
COPY ./dist ./src
COPY ./.env.development.local .
EXPOSE 3000
CMD ["node", "src/main.js"]