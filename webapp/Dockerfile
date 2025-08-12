# --- Стадия сборки ---
FROM node:20-slim AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# 3) Копируем весь код и собираем в том же слое
COPY . .
RUN npm run build

# --- Стадия раннера ---
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# entrypoint заменяет {{API_BASE_URL}} на реальное значение из окружения
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

