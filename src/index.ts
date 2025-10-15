import "dotenv/config";
import express from "express";
import morgan from 'morgan'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { init } from "./db/db";
import { createTable } from "./db/dbCreateTable";
import routerProducts from "./routes/products";
import routerCategory from './routes/category'
import routerLogin from './routes/login'
import routerFiles from './routes/files'
import routerUploads from './routes/uploads'
import openapiSpecification from './swagger'
import { initializeDirectories } from "./service/serviceFileSystem";

const app = express();

initializeDirectories(['uploads','products'])

app.use(cors()) // ✅ разрешает все источники
app.use(morgan('dev')); // простой логгер
app.use(express.json({ limit: '10mb' })); // Middleware для парсинга JSON
app.use(routerProducts);
app.use(routerCategory);
app.use(routerLogin)
app.use(routerFiles)
app.use(routerUploads)
app.use('/api-docs-tw', swaggerUi.serve, swaggerUi.setup(openapiSpecification));


// Инициализация базы данных перед запуском сервера
async function startServer() {
  try {
    await init("./database.db");
    await createTable();
    console.log("Database initialized successfully");
    
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT || 3000}!`);
    });
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
}

startServer();
