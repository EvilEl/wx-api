import express from "express";
import handlerProduct from "../handlers/handlerProduct";
import authenticateToken from '../middlewear/authenticateToken'

const router = express.Router();

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     security:
 *       - bearerAuth: []
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCreate'
 *     responses:
 *       200:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 *       409:
 *         description: Conflict name
 *       400:
 *         description: Invalid input
 */
router.post("/products", authenticateToken, handlerProduct.createProduct);

/**
 *  @swagger
 *  /products/{id}:
 *    delete:
 *      summary: Removes a product by id
 *      security:
 *       - bearerAuth: []
 *      tags: [Products]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: product id
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: The product was deleted
 *        404:
 *          description: The product was not found
 */
router.delete("/products/:id", authenticateToken, handlerProduct.removeProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Updates a product by id
 *     security:
 *      - bearerAuth: []
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductUpdate'
 *     responses:
 *       200:
 *         description: The product was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some errors happened.
 */
router.put("/products/:id", authenticateToken, handlerProduct.updateProduct);

/**
 * @swagger
 * /products:
 *  get:
 *      summary: Returns all products
 *      tags: [Products]
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
router.get("/products", handlerProduct.getAllProducts);

/**
 * @swagger
 * /products/type/{type}:
 *  get:
 *      summary: Returns products by type
 *      tags: [Products]
 *      parameters:
 *        - in: path
 *          name: type
 *          description: product type (candle, diffuser, sachet)
 *          required: true
 *          schema:
 *            type: string
 *            enum: [candle, diffuser, sachet]
 *      responses:
 *       200:
 *        description: the list of products by type
 *        content:
 *          application/json:
 *           schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Product'
 */
router.get("/products/type/:type", handlerProduct.getProductsByType);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by id
 *     tags: [Products]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of product
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: product info.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: product is not found
 */
router.get('/products/:id', handlerProduct.getProduct)

/**
 * @swagger
 * /products/{id}/files:
 *   post:
 *     summary: Upload file to product
 *     security:
 *      - bearerAuth: []
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: product id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FilesCreate'
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/products/:id/files", authenticateToken, handlerProduct.uploadFileToProduct);

/**
 * @swagger
 * /products/{id}/files:
 *   get:
 *     summary: Get all files for product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: product id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of files for product
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Files'
 */
router.get('/products/:id/files', handlerProduct.getProductFiles)

/**
 * @swagger
 * /products/{id}/files:
 *   delete:
 *     summary: Delete all files for product
 *     security:
 *      - bearerAuth: []
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: product id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Files deleted successfully
 *       500:
 *         description: Server error
 */
router.delete("/products/:id/files", authenticateToken, handlerProduct.deleteProductFiles);

export default router;