import express from "express";
import authenticateToken from '../middlewear/authenticateToken'
import handlerCategory from '../handlers/handlerCategory'

const router = express.Router();

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     security:
 *       - bearerAuth: []
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryCreate'
 *     responses:
 *       200:
 *         description: The category was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Some server error
 *       409:
 *         description: Conflict name
 *       400:
 *         description: Invalid input
 */
router.post("/category", authenticateToken, handlerCategory.createCategory);

/**
 *  @swagger
 *  /category/{id}:
 *    delete:
 *      summary: Removes a category by id
 *      security:
 *       - bearerAuth: []
 *      tags: [Products]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: category id
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: The category was deleted
 *        404:
 *          description: The category was not found
 */
router.delete("/category/:id", authenticateToken, handlerCategory.removeCategory);

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Updates a category by id
 *     security:
 *      - bearerAuth: []
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: category id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryUpdate'
 *     responses:
 *       200:
 *         description: The category was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Some errors happened.
 */
router.put("/category/:id", authenticateToken, handlerCategory.updateCategory);

/**
 * @swagger
 * /categories:
 *  get:
 *      summary: Returns all products
 *      tags: [Categories]
 *      responses:
 *       200:
 *        description: the list of products
 *        content:
 *          application/json:
 *           schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Product'
 */
router.get("/category", handlerCategory.getAllCategory);

export default router;