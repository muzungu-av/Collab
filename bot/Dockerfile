# Используем Alpine с Node.js
FROM node:20-alpine

# Устанавливаем bash и curl (если нужны)
RUN apk add --no-cache bash curl

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY bot.js package.json ./
RUN npm install --omit=dev

CMD ["node", "bot.js"]
