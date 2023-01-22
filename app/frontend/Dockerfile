FROM node:16.14-alpine
WORKDIR /app-frontend
COPY . .
EXPOSE 3002
RUN npm install
ENTRYPOINT [ "npm", "start" ]
