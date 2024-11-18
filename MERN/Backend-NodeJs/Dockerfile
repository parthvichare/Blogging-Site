# # Use the official Node.js image
# FROM node:16

# # Set the working directory inside the container
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the application code
# COPY . .

# # Expose the port your app runs on
# EXPOSE 8000

# # Start the application
# CMD ["npm", "start"]


# Set the base image for Node.js
FROM node:16

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon globally (optional)
RUN npm install -g nodemon

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 8000

# Start the application using nodemon
CMD ["nodemon", "index.js"]  