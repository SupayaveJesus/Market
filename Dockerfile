# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./src/backend/package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY ./src/backend/ .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["node", "index.js"]
