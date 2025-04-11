import express from "express";
import handlerLogin from '../handlers/handlerLogin'
const router = express.Router();



/**
 * @swagger
 * /login:
 *   post:
 *     summary: login
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: successfully login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *       400:
 *         description: Invalid input
 */
router.post('/login', handlerLogin.login)



export default router
