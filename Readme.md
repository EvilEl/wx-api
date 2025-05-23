# 🚀 Запуск проекта

```bash 
npm install
```
  
```bash 
npm run start
```
# 📦 cборка Docker

```bash 
docker build -t project:demo .
```

# 📘 Swagger-документация
## После запуска сервера, вы можете открыть документацию по адресу:
[http://localhost:3000/api-docs-tw](Документация)
Если ваш сервер работает на другом порту, замените 3000 на нужный.



# 📁 Структура проекта (пример)

├── /src

  └──routes/

     └── candles.ts

 └── swagger.ts

├── package.json

├── README.md


## Commit types

| Commit Type | Title                    | Description                                                                                                   | Emoji |
| ----------- | ------------------------ | ------------------------------------------------------------------------------------------------------------- | :---: |
| `feat`      | Features                 | коммит, который содержит новый функционал                                                                     |  ✨   |
| `fix`       | Bug Fixes                | коммит, который устраняет баг                                                                                 |  🐛   |
| `docs`      | Documentation            | этот коммит изменяет документацию, readme.md или markdown файлы.                                              |  📚   |
| `style`     | Styles                   | Изменения, не влияющие на смысл кода (пробелы, форматирование, отсутствие полутонов и т.д.)                   |  💎   |
| `refactor`  | Code Refactoring         | этот коммит содержит рефакторинг, который включает рефакторинг кода или изменения                             |  📦   |
| `perf`      | Performance Improvements | Изменение кода, улучшающее производительность                                                                 |  🚀   |
| `test`      | Tests                    | Добавление недостающих тестов или исправление существующих                                                    |  🚨   |
| `build`     | Builds                   | это файлы, которые включают файлы сборки и зависимости                                                        |  🛠   |
| `ci`        | Continuous Integrations  | В котором содержатся изменения в интеграции CI в файлах или скриптах                                          |  ⚙️   |
| `chore`     | Chores                   | Изменение кода, которое не исправляет ошибку и не добавляет функцию, а модифицирует или обновляет зависимости |  ♻️   |
| `revert`    | Reverts                  | Отменяет предыдущую коммит                                                                                    |  🗑   |
