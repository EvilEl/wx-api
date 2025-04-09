import "dotenv/config";
import express from "express";
import { init } from "./db/db";
import { createTable } from "./db/dbCreateTable";
import routerSachet from "./router/sachet";
import routerDiffuser from "./router/diffuser";
import routerCandle from "./router/candle";

const app = express();

app.use(express.json()); // Middleware для парсинга JSON

app.use(routerSachet);
app.use(routerDiffuser);
app.use(routerCandle);



app.listen(process.env.PORT, async () => {
  await init("./database.db");
  createTable();
  console.log("Example app listening on port 3000!");
});
