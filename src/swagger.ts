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
 *
 * @swagger
 *  tags:
 *    name: Candles
 */


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tw Base',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.js', './src/routes/*.ts', './src/swagger.js', './src/swagger.ts'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

export default openapiSpecification
