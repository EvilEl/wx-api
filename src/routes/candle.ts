import express from "express";
import handlersCandle from "../handlers/handlerCandle";

const router = express.Router();



router.post("/createCandle", handlersCandle.createCandle);

router.delete("/removeCandle/:id", handlersCandle.removeCandle);

router.put("/updateCandle/:id", handlersCandle.updateCandle);

/**
 * @swagger
 * /getCandles:
 *  get:
 *      summary: Returns all candles
 *      tags: [Candles]
 *      responses:
 *       200:
 *        description: the list of candles
 *        content:
 *          application/json:
 *           schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Candle'
 */
router.get("/getCandles", handlersCandle.getCandles);

export default router;
