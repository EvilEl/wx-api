import swaggerJsdoc from 'swagger-jsdoc'
/**
 * @swagger
 * components:
 *   schemas:
 *     Candle:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - count
 *         - price
 *       properties:
 *           id:
 *            type: number
 *           name:
 *            type: string
 *           count:
 *            type: number
 *           price:
 *            type: number
 *       example:
 *           id:   1
 *           name: 'Candle'
 *           count: 20
 *           price: 20
 *     CandleCreate:
 *       type: object
 *       required:
 *         - name
 *         - count
 *         - price
 *       properties:
 *         name:
 *           type: string
 *         count:
 *           type: number
 *         price:
 *           type: number
 *       example:
 *         name: 'Candle'
 *         count: 5
 *         price: 100
 *     CandleUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         count:
 *           type: number
 *         price:
 *           type: number
 *       example:
 *         name: 'Candle'
 *         count: 5
 *         price: 100
 *     Diffuser:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - count
 *         - price
 *       properties:
 *           id:
 *            type: number
 *           name:
 *            type: string
 *           count:
 *            type: number
 *           price:
 *            type: number
 *       example:
 *           id:   1
 *           name: 'Diffuser'
 *           count: 20
 *           price: 20
*     DiffuserCreate:
 *       type: object
 *       required:
 *         - name
 *         - count
 *         - price
 *       properties:
 *         name:
 *           type: string
 *         count:
 *           type: number
 *         price:
 *           type: number
 *       example:
 *         name: 'Diffuser'
 *         count: 5
 *         price: 100
 *     DiffuserUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         count:
 *           type: number
 *         price:
 *           type: number
 *       example:
 *         name: 'Diffuser'
 *         count: 5
 *         price: 100
 *     Sachet:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - count
 *         - price
 *       properties:
 *           id:
 *            type: number
 *           name:
 *            type: string
 *           count:
 *            type: number
 *           price:
 *            type: number
 *       example:
 *           id:   1
 *           name: 'Sachet'
 *           count: 20
 *           price: 20
*     SachetCreate:
 *       type: object
 *       required:
 *         - name
 *         - count
 *         - price
 *       properties:
 *         name:
 *           type: string
 *         count:
 *           type: number
 *         price:
 *           type: number
 *       example:
 *         name: 'Sachet'
 *         count: 5
 *         price: 100
 *     SachetUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         count:
 *           type: number
 *         price:
 *           type: number
 *       example:
 *         name: 'Sachet'
 *         count: 5
 *         price: 100
 *     LoginUser:
 *       type: object
 *       required:
 *         - login
 *         - password
 *       properties:
 *         login:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         login: 'admin'
 *         password: 'ddddd'
 *     User:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *         token:
 *           type: string
 *       example:
 *         userName: 'admin'
 *         token: 'token'
 */

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tw Base',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          name: 'Authorization',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
        },
      }
    },
  },
  apis: ['./src/routes/*.js', './src/routes/*.ts', './src/swagger.js', './src/swagger.ts'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

export default openapiSpecification
