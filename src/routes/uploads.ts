import express from "express";
import path from "path";

const router = express.Router();

// Статическая отдача файлов продуктов
router.use('/uploads/products', express.static(path.join(__dirname, '../uploads/products')));

export default router