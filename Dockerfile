# Use an official Node.js runtime as the base image
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the app's source code to the container
COPY . .

# Build the Angular app
RUN npm run build

# Use a lightweight web server to serve the Angular app
FROM nginx:alpine
COPY --from=build /app/dist/aiod-admin-panel /usr/share/nginx/html
