#Check out https://hub.docker.com/_/node to select a new base image
FROM node:16-slim


# Create app directory (with user `node`)
RUN mkdir -p /app

WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY . .
# Bundle app source code

#RUN rm -rf /app/application/config/database.js
COPY database.js /app/application/config/database.js
RUN npm install
# | base64 -d > ./application/config/databbase.js
#RUN npm run build

# Bind to all network interfaces so that it can be mapped to the host OS
#ENV HOST=0.0.0.0 PORT=3000

EXPOSE 3000
CMD [ "node", "server.js" ]
