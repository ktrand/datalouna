# Установка и запуск проекта

## Шаги для настройки

1. **Создайте файл `.env`** в корневой папке проекта.

   ```bash
   touch .env
   ```

2. **Скопируйте содержимое** файла `.env.example` из соответствующих папок в только что созданные файлы `.env`.

   ```bash
   cp .env.example .env
   ```

3. **Запустите Docker Compose** для поднятия всех сервисов.

   ```bash
   docker-compose up -d
   ```

4. **Запустите скрипт для создания таблиц.**

   ```bash
   docker exec app ts-node-dev src/database/init-db.ts
   ```

5. **Запустите скрипт для запуска сидов.**

   ```bash
   docker exec app ts-node-dev src/database/seed.ts
   ```

Теперь ваш проект готов к использованию!
