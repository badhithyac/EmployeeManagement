# Dockerfile for React Frontend
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Clean npm cache and install dependencies
RUN npm cache clean --force
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port for React development server
EXPOSE 3000

# Start the React application
CMD ["npm", "start"]
