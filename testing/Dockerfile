# Base image
FROM node:20

# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:v1.35.1-jammy

# Set the working directory
WORKDIR /tests

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Set the entry point for the container
CMD ["npx", "playwright", "test", "--project=docker"]