FROM mirror.gcr.io/library/node:20-slim

# Устанавливаем bash и curl
#RUN apt update && apt install -y bash curl

WORKDIR /app

# Копируем только package.json и устанавливаем зависимости
COPY package.json ./
# Пробуем скопировать yarn.lock (если существует)
RUN if [ -f yarn.lock ]; then cp yarn.lock ./; fi
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; else yarn install --immutable; fi

# Копируем остальные файлы
COPY bot.js ./

CMD ["node", "bot.js"]
