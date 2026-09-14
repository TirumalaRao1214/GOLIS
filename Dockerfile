# ─── Stage 1: Build the React/Vite app ───────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy all source files
COPY . .

# Run the production build — generates /app/dist/
RUN npm run build

# Verify dist/index.html references /assets/*.js (not main.tsx)
RUN grep -q "assets/" dist/index.html && echo "BUILD OK: dist/index.html is correct" || (echo "BUILD FAILED: dist/index.html is wrong" && exit 1)

# ─── Stage 2: Serve with Nginx ────────────────────────────────────────────────
FROM nginx:1.25-alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy ONLY the built dist/ folder — NOT the source files
COPY --from=builder /app/dist /usr/share/nginx/html

# Verify the deployed index.html is the built one (references /assets/)
RUN grep -q "assets/" /usr/share/nginx/html/index.html && echo "DEPLOY OK" || (echo "DEPLOY FAILED" && exit 1)

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
