# Use node image as base
FROM node:20.11.1-bullseye-slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyCPAZhgtCK_x6B3wj53xLPaEExUrNHBGRw" \
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="devkraft-dk.firebaseapp.com" \
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="devkraft-dk" \
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="devkraft-dk.appspot.com" \
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="904428900007" \
    NEXT_PUBLIC_FIREBASE_APP_ID="1:904428900007:web:a06cfdbc00af3102df1582"
	
# Expose port (if needed)
# EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "dev"]