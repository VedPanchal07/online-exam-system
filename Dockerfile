# Step 1: Build React app
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all code
COPY . .

# Build React app
RUN npm run build

# Step 2: Serve with nginx
FROM nginx:alpine

# Copy build output to nginx
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]