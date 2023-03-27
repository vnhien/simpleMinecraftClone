FROM node:alpine

RUN npm install -g serve

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD serve -s build -p 3000
