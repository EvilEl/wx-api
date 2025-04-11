import express from "express";
import handlersSachet from "../handlers/handlerSachet";

const router = express.Router();

/**
 * @swagger
 * /sachet:
 *   post:
 *     summary: Create a new sachet
 *     tags: [Sachets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SachetCreate'
 *     responses:
 *       200:
 *         description: The sachet was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sachet'
 *       500:
 *         description: Some server error
 *       409:
 *         description: Conflict name
 *       400:
 *         description: Invalid input
 */
router.post("/sachet", handlersSachet.createSachet);

/**
 * @swagger
 *  /sachet/{id}:
 *    delete:
 *      summary: Removes a sachet by id
 *      tags: [Sachets]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: sachet id
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: The sachet was deleted
 *        404:
 *          description: The post was not found
 */
router.delete("/sachet/:id", handlersSachet.removeSachet);

/**
 * @swagger
 * /sachet/{id}:
 *   put:
 *     summary: Updates a sachet by id
 *     tags: [Sachets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: sachet id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SachetUpdate'
 *     responses:
 *       200:
 *         description: The candle was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sachet'
 *       500:
 *         description: Some errors happend.
 */
router.put("/sachet/:id", handlersSachet.updateSachet);

/**
 * @swagger
 * /sachets:
 *  get:
 *      summary: Returns all sachets
 *      tags: [Sachets]
 *      responses:
 *       200:
 *        description: the list of sachets
 *        content:
 *          application/json:
 *           schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Sachet'
 */
router.get("/sachets", handlersSachet.getSachets);


/**
 * @swagger
 * /sachet/{id}:
 *   get:
 *     summary: Get a sachet by id
 *     tags: [Sachets]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of sachet
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: sachet info.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sachet'
 *       404:
 *         description: sachet is not found
 */
router.get('/sachet/:id', handlersSachet.getSachet)

export default router;
