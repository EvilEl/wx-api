import "dotenv/config";
import express from "express";
import morgan from 'morgan'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { init } from "./db/db";
import { createTable } from "./db/dbCreateTable";
import routerProducts from "./routes/products";
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
app.use(routerLogin)
app.use(routerFiles)
app.use(routerUploads)
app.use('/api-docs-tw', swaggerUi.serve, swaggerUi.setup(openapiSpecification));


app.listen(process.env.PORT, async () => {
  await init("./database.db");
  createTable();
  console.log("Example app listening on port 3000!");
});
