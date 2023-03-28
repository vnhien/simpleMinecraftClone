FROM node:alpine

RUN npm install -g serve

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM nginx:1.19.8-alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]
