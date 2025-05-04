import express from "express";
import handlerFiles from "../handlers/handlerFiles";
import authenticateToken from '../middlewear/authenticateToken'

const router = express.Router();

/**
 * @swagger
 * /files/product:
 *   post:
 *     summary: Create a new file
 *     security:
 *      - bearerAuth: []
 *     tags: [Files]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FilesCreate'
 *     responses:
 *       200:
 *         description: The candle was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Files'
 *       500:
 *         description: Some server error
 *       409:
 *         description: Conflict name
 *       400:
 *         description: Invalid input
 */
router.post("/files/product", authenticateToken, handlerFiles.createFile);


/**
 * @swagger
 *  /files/{id}:
 *    delete:
 *      summary: Removes a files by id
 *      security:
 *       - bearerAuth: []
 *      tags: [Files]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: file id
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: The files was deleted
 *        404:
 *          description: The post was not found
 */
router.delete("/files/:id", authenticateToken, handlerFiles.removeFilesIdProduct);

/**
 * @swagger
 * /files/product/{id}:
 *   get:
 *     summary: Get a files by id
 *     security:
 *      - bearerAuth: []
 *     tags: [Files]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of files
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: files info.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/File'
 *       404:
 *         description: files is not found
 */
router.get('/files/:id', authenticateToken, handlerFiles.getAllFilesForIdProduct)

export default router;
