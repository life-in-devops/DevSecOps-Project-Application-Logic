# Use the official Node LTS image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only package files first to install dependencies (better Docker caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose port 5000 (Express server port)
EXPOSE 5000

# Start the application
CMD [ "npm", "start" ]
