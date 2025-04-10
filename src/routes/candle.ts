import express from "express";
import handlersCandle from "../handlers/handlerCandle";

const router = express.Router();


/**
 * @swagger
 * /candle:
 *   post:
 *     summary: Create a new candle
 *     tags: [Candles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CandleCreate'
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candle'
 *       500:
 *         description: Some server error
 *       409:
 *         description: Conflict name
 *       400:
 *         description: Invalid input
 */
router.post("/candle", handlersCandle.createCandle);


/**
 * @swagger
 *  /candle/{id}:
 *    delete:
 *      summary: Removes a candle by id
 *      tags: [Candles]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: candle id
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: The book was deleted
 *        404:
 *          description: The post was not found
 */
router.delete("/candle/:id", handlersCandle.removeCandle);

/**
 * @swagger
 * /candle/{id}:
 *   put:
 *     summary: Updates a candle by id
 *     tags: [Candles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: book id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CandleUpdate'
 *     responses:
 *       200:
 *         decsription: The book was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candle'
 *       500:
 *         description: Some errors happend.
 */

router.put("/candle/:id", handlersCandle.updateCandle);

/**
 * @swagger
 * /candles:
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
router.get("/candles", handlersCandle.getCandles);

//TODO добавить получение candle по Id
/**
 * @swagger
 * /candle/{id}:
 *   get:
 *     summary: Gets a candle by id
 *     tags: [Candles]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of candle
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: candle info.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candle'
 *       404:
 *         description: book is not found
 */
router.get('/candle/:id', () => {
  console.log('get candle id');

})

export default router;






