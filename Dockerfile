FROM node:16

# Create app repository
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app src
COPY . .

# Env variable
ENV NODE_PORT=8080

EXPOSE 8080

CMD ["node", "src/app.js"]

