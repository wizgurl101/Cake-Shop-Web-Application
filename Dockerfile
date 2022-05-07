FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY ./backend .

EXPOSE 80

CMD ["npm", "start"]