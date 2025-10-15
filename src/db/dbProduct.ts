import { CategoryId } from "../models/Category";
import { PartialProductWithoutId, ProductId } from "../models/Product";
import { createUpdateParams } from "../utils/formattedUpdateParams";
import { run, all, get } from "./db";

async function createProduct(...params: unknown[]) {
  return run(
    `INSERT INTO products (
    name,
    categoryId,
    count,
    price
    )
    VALUES (?, ?, ?, ?)
    `,
    ...params
  );
}

async function removeProduct(id: ProductId) {
  return run(`DELETE FROM products
      WHERE id = ?
    `, id);
}

async function updateProduct(id: ProductId, data: PartialProductWithoutId) {
  return run(`
      UPDATE products
      SET ${createUpdateParams(data)}
      WHERE id = ?
    `, id);
}

async function getAllProducts() {
  const products: any = await all(`
    SELECT * FROM products
    `);
  
  // Получаем файлы для каждого продукта
  for (const product of products) {
    const files = await all(`
      SELECT * FROM files WHERE idProduct = ?
    `, product.id);
    product.files = files;
  }
  
  return products;
}

async function getProductsByType(categoryId: CategoryId) {
  const products: any = await all(`
    SELECT * FROM products WHERE categoryId = ?
    `, categoryId);
    
  // Получаем файлы для каждого продукта
  for (const product of products) {
    const files = await all(`
      SELECT * FROM files WHERE idProduct = ?
    `, product.id);
    product.files = files;
  }
  
  return products;
}

async function getProduct(id: ProductId) {
  const product: any = await get('SELECT * FROM products WHERE id = ?', id);
  
  if (product) {
    // Получаем файлы для продукта
    const files = await all(`
      SELECT * FROM files WHERE idProduct = ?
    `, product.id);
    product.files = files;
  }
  
  return product;
}

export default { 
  createProduct, 
  removeProduct, 
  updateProduct, 
  getAllProducts, 
  getProductsByType,
  getProduct 
};