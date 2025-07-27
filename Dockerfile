FROM node:22-alpine

# Установка рабочей директории
WORKDIR /app

# Копирование зависимостей
COPY package*.json ./


# Установка зависимостей через pnpm
RUN npm install

# Весь остальной код копируем
COPY . .


ENV PORT="3000"
ENV PASSWORD="WaxSystem"
ENV JWT_SECRET_KEY = AAATESTKEY
ENV JWT_REFRESH_SECRET_KEY = AAAREFRESHTESTKEY


EXPOSE 3000
# Запуск
CMD ["npm", "run", "dev"]
