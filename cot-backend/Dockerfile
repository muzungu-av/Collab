# 🏗️ Stage 1: Build stage
FROM mirror.gcr.io/library/node:22.12.0-slim AS builder

WORKDIR /app

# Копируем только package.json и устанавливаем зависимости
COPY package.json ./
# Пробуем скопировать yarn.lock (если существует)
RUN if [ -f yarn.lock ]; then cp yarn.lock ./; fi
RUN if [ -f yarn.lock ]; then yarn install --prefer-offline --frozen-lockfile; else yarn install --prefer-offline ; fi

# Копируем исходники и конфиги (всё в одном слое)
COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY src ./src

# Сборка
RUN yarn build

#
FROM mirror.gcr.io/library/node:22.12.0-slim AS runner

WORKDIR /app
# Копируем package.json/yarn.lock (для информации)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json /app/yarn.lock ./
# Копируем только dist и нужные конфиги
COPY tsconfig.json nest-cli.json ./
COPY --from=builder /app/dist ./dist

# COPY package.json yarn.lock ./
# RUN npm ci --omit=dev

# # Копируем только dist (результат сборки) и нужные конфиги
# COPY --from=builder /app/dist ./dist
# COPY tsconfig.json nest-cli.json ./
COPY .env.development.local ./.env
EXPOSE 4000

CMD ["node", "dist/main"]
