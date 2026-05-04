FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose server port (adjust if your app uses 3001 or 5000)
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
