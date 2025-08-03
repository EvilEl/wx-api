import swaggerJsdoc from 'swagger-jsdoc'
/**
 * @swagger
 * components:
 *   schemas:
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
 *         login:
 *           type: string
 *         accessToken:
 *           type: string
 *         refreshToken:
 *           type: string
 *       example:
 *         login: 'admin'
 *         accessToken: 'some.jwt.token'
 *         refreshToken: 'another.jwt.token'
 *     Files:
 *       type: object
 *       required:
 *         - id
 *         - filename
 *         - originalname
 *         - mimeType
 *         - size
 *         - link
 *         - base64
 *         - createdDate
 *         - idProduct
 *       properties:
 *           id:
 *            type: number
 *           filename:
 *            type: string
 *           originalname:
 *            type: string
 *           mimeType:
 *            type: string
 *           size:
 *            type: number
 *           link:
 *            type: string
 *           base64:
 *            type: string
 *           createdDate:
 *            type: string
 *            format: date-time
 *           idProduct:
 *            type: number
 *       example:
 *           id: 1
 *           filename: '1'
 *           originalname: '1.png'
 *           mimeType: 'image/png'
 *           size: 20000
 *           base64: 'dasdasdasdasd'
 *           createdDate: '2025-04-28 21:37:20'
 *           idProduct: 1
 *     FilesCreate:
 *       type: object
 *       required:
 *         - filename
 *         - idProduct
 *         - originalname
 *         - mimeType
 *         - size
 *         - link
 *         - base64
 *       properties:
 *         filename:
 *           type: 'string'
 *         originalname:
 *           type: string
 *         idProduct:
 *           type: number
 *         mimeType:
 *           type: string
 *         size:
 *           type: number
 *         link:
 *           type: string
 *         base64:
 *           type: string
 *       example:
 *           filename: '1'
 *           originalname: '1.png'
 *           mimeType: 'image/png'
 *           size: 20000
 *           link: 'dasdasas'
 *           base64: 'dasdasdasdasd'
 *           idProduct: 1
 *     Product:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - type
 *         - count
 *         - price
 *       properties:
 *           id:
 *            type: number
 *           name:
 *            type: string
 *           type:
 *            type: string
 *            enum: [candle, diffuser, sachet]
 *           count:
 *            type: number
 *           price:
 *            type: number
 *           files:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Files'
 *       example:
 *           id: 1
 *           name: 'Vanilla Candle'
 *           type: 'candle'
 *           count: 20
 *           price: 250
 *           files: [
 *             {
 *               id: 1,
 *               filename: '1735834567123_candle1.jpg',
 *               originalname: 'vanilla-candle.jpg',
 *               mimeType: 'image/jpeg',
 *               size: 125000,
 *               link: '/uploads/products/1735834567123_candle1.jpg',
 *               base64: null,
 *               createdDate: '2025-04-28 21:37:20',
 *               idProduct: 1
 *             }
 *           ]
 *     ProductCreate:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - count
 *         - price
 *       properties:
 *         name:
 *           type: string
 *         type:
 *           type: string
 *           enum: [candle, diffuser, sachet]
 *         count:
 *           type: number
 *         price:
 *           type: number
 *       example:
 *         name: 'Lavender Sachet'
 *         type: 'sachet'
 *         count: 15
 *         price: 120
 *     ProductUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         type:
 *           type: string
 *           enum: [candle, diffuser, sachet]
 *         count:
 *           type: number
 *         price:
 *           type: number
 *       example:
 *         name: 'Rose Diffuser'
 *         type: 'diffuser'
 *         count: 8
 *         price: 350
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
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"'
        },
      }
    },
  },
  apis: ['./src/routes/*.js', './src/routes/*.ts', './src/swagger.js', './src/swagger.ts'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

export default openapiSpecification
