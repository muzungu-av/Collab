# --- Стадия сборки ---
FROM mirror.gcr.io/library/node:22.12.0-slim AS builder
WORKDIR /app

# Копируем только package.json и устанавливаем зависимости
COPY package.json ./
# Пробуем скопировать yarn.lock (если существует)
RUN if [ -f yarn.lock ]; then cp yarn.lock ./; fi
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; else yarn install --immutable; fi
# Копируем весь код и собираем
COPY .env.development ./.env
COPY . .

RUN yarn build

# --- Стадия запуска ---
FROM mirror.gcr.io/library/nginx:1.25.3-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

