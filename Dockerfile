FROM --platform=linux/amd64 node:16.15.1-alpine
WORKDIR /app
COPY . .
RUN npm install 
