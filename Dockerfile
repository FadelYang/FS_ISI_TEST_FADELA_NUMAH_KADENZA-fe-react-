# Use Node 18.18.0 instead of latest
FROM node:18.18.0

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]

