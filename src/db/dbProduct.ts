import { PartialProductWithoutId, ProductId, ProductType } from "../models/Product";
import { createUpdateParams } from "../utils/formattedUpdateParams";
import { run, all, get } from "./db";

async function createProduct(...params: unknown[]) {
  return run(
    `INSERT INTO products (
    name,
    type,
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
  return all(`
    SELECT * FROM products
    `);
}

async function getProductsByType(type: ProductType) {
  return all(`
    SELECT * FROM products WHERE type = ?
    `, type);
}

async function getProduct(id: ProductId) {
  const sql = 'SELECT * FROM products WHERE id = ?';
  return get(sql, id);
}

export default { 
  createProduct, 
  removeProduct, 
  updateProduct, 
  getAllProducts, 
  getProductsByType,
  getProduct 
};