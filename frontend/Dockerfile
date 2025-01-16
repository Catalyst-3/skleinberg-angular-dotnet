FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install -g @angular/cli@19.0.5
RUN npm install
COPY . /app/
RUN mkdir -p ./src/assets
ARG API_URL
ENV API_URL=${API_URL}
RUN node set-env.js
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]
