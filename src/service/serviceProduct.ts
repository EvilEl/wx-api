import dbProduct from "../db/dbProduct";
import { CategoryId } from "../models/Category";
import {
  ProductWithoutId,
  ProductId,
  PartialProductWithoutId,
} from "../models/Product";

async function createProduct({ name, categoryId, count, price }: ProductWithoutId) {
  return dbProduct.createProduct(name, categoryId, count, price);
}

async function removeProduct(id: ProductId) {
  return dbProduct.removeProduct(id);
}

async function updateProduct(
  id: ProductId,
  data: Partial<PartialProductWithoutId>
) {
  return dbProduct.updateProduct(id, data);
}

async function getAllProducts() {
  return dbProduct.getAllProducts();
}

async function getProductsByType(categoryId: CategoryId) {
  return dbProduct.getProductsByType(categoryId);
}

async function getProduct(id: ProductId) {
  return dbProduct.getProduct(id);
}

export default { 
  createProduct, 
  removeProduct, 
  updateProduct, 
  getAllProducts, 
  getProductsByType,
  getProduct 
};