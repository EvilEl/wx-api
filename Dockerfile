FROM node:22-alpine

# Установка рабочей директории
WORKDIR /app

# Копирование зависимостей
COPY package*.json ./


# Установка зависимостей через pnpm
RUN npm install -g pm2 && npm install

# Весь остальной код копируем
COPY . .


# Переменные окружения
ENV PORT=3000
ENV PASSWORD=WaxSystem
ENV JWT_SECRET_KEY=AAATESTKEY
ENV JWT_REFRESH_SECRET_KEY=AAAREFRESHTESTKEY

# Создание необходимых директорий
RUN mkdir -p uploads logs

EXPOSE 3000

# Запуск через PM2
CMD ["npm", "run", "pm2:start"]