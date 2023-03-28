FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

RUN sudo apt update

RUN sudo apt install nginx 

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]
