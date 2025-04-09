import express from "express";
import handlersCandle from "../handlers/handlerCandle";

const router = express.Router();

router.post("/createCandle", handlersCandle.createCandle);

router.delete("/removeCandle/:id", handlersCandle.removeCandle);

router.put("/updateCandle/:id", handlersCandle.updateCandle);

router.get("/getCandles", handlersCandle.getCandles);

export default router;
