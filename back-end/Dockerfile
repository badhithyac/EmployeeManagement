# Dockerfile for Node.js Backend
FROM node:20

# Set working directory
WORKDIR  /app

# Copy package files first
COPY package*.json ./

# Clean npm cache and install dependencies
RUN npm cache clean --force
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port for Node.js backend server
EXPOSE 3001

# Start the Node.js server
CMD ["node", "script.js"]
