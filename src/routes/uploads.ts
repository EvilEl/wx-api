import express from "express";

const router = express.Router();

router.get('/uploads/products/:id',()=>{
  console.log('__dirname',__dirname);
})

export default router