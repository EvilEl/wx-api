import express from "express";
import handlerDiffuser from "../handlers/handlerDiffuser";
const router = express.Router();


/**
 * @swagger
 * /diffuser:
 *   post:
 *     summary: Create a new diffuser
 *     tags: [Diffusers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DiffuserCreate'
 *     responses:
 *       200:
 *         description: The candle was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Diffuser'
 *       500:
 *         description: Some server error
 *       409:
 *         description: Conflict name
 *       400:
 *         description: Invalid input
 */
router.post("/diffuser", handlerDiffuser.createDiffuser);

/**
 * @swagger
 *  /diffuser/{id}:
 *    delete:
 *      summary: Removes a diffuser by id
 *      tags: [Diffusers]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: diffuser id
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: The diffuser was deleted
 *        404:
 *          description: The post was not found
 */
router.delete("/removeDiffuser/:id", handlerDiffuser.removeDiffuser);

/**
 * @swagger
 * /diffuser/{id}:
 *   put:
 *     summary: Updates a diffuser by id
 *     tags: [Diffusers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: diffuser id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DiffuserUpdate'
 *     responses:
 *       200:
 *         decsription: The candle was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Diffuser'
 *       500:
 *         description: Some errors happend.
 */
router.put("/updateDiffuser/:id", handlerDiffuser.updateDiffuser);


/**
 * @swagger
 * /diffusers:
 *  get:
 *      summary: Returns all diffusers
 *      tags: [Diffusers]
 *      responses:
 *       200:
 *        description: the list of diffusers
 *        content:
 *          application/json:
 *           schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Diffuser'
 */
router.get("/diffusers", handlerDiffuser.getDiffusers);

/**
 * @swagger
 * /diffuser/{id}:
 *   get:
 *     summary: Get a diffuser by id
 *     tags: [Diffusers]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of diffuser
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: diffuser info.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Diffuser'
 *       404:
 *         description: diffuser is not found
 */
router.get('/diffuser/:id', handlerDiffuser.getDiffuser)

export default router;
