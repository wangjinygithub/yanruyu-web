
FROM nginx:1.15-alpine 
WORKDIR /usr
COPY ./dist /usr/share/nginx/html
WORKDIR /etc
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]