import dbProduct from "../db/dbProduct";
import {
  ProductWithoutId,
  ProductId,
  PartialProductWithoutId,
  ProductType,
} from "../models/Product";

async function createProduct({ name, type, count, price }: ProductWithoutId) {
  return dbProduct.createProduct(name, type, count, price);
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

async function getProductsByType(type: ProductType) {
  return dbProduct.getProductsByType(type);
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