import "dotenv/config";
import express from "express";
import morgan from 'morgan'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'

import { init } from "./db/db";
import { createTable } from "./db/dbCreateTable";
import routerSachet from "./routes/sachet";
import routerDiffuser from "./routes/diffuser";
import routerCandle from "./routes/candle";
import routerLogin from './routes/login'
import openapiSpecification from './swagger'

const app = express();
app.use(cors()) // ✅ разрешает все источники
app.use(morgan('dev')); // простой логгер
app.use(express.json()); // Middleware для парсинга JSON
app.use(routerSachet);
app.use(routerDiffuser);
app.use(routerCandle);
app.use(routerLogin)
app.use('/api-docs-tw', swaggerUi.serve, swaggerUi.setup(openapiSpecification));



app.listen(process.env.PORT, async () => {
  await init("./database.db");
  createTable();
  console.log("Example app listening on port 3000!");
});
