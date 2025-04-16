import express from "express";
import handlersCandle from "../handlers/handlerCandle";
import authenticateToken from '../middlewear/authenticateToken'

const router = express.Router();


/**
 * @swagger
 * /candle:
 *   post:
 *     summary: Create a new candle
 *     security:
 *       - bearerAuth: []
 *     tags: [Candles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CandleCreate'
 *     responses:
 *       200:
 *         description: The candle was successfully created
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
router.post("/candle", authenticateToken, handlersCandle.createCandle);


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
 *          description: The candle was deleted
 *        404:
 *          description: The post was not found
 */
router.delete("/candle/:id", authenticateToken, handlersCandle.removeCandle);

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
 *         description: candle id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CandleUpdate'
 *     responses:
 *       200:
 *         description: The candle was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candle'
 *       500:
 *         description: Some errors happend.
 */
router.put("/candle/:id", authenticateToken, handlersCandle.updateCandle);

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

/**
 * @swagger
 * /candle/{id}:
 *   get:
 *     summary: Get a candle by id
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
 *         description: candle is not found
 */
router.get('/candle/:id', handlersCandle.getCandle)

export default router;






