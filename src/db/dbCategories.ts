import { Category, CategoryId, PartialCategoryWithoutId } from "../models/Category";
import { createUpdateParams } from "../utils/formattedUpdateParams";
import { run, all } from "./db";

function createCategory(...params:unknown[]) {
  return run(
    `INSERT INTO categories (name, description) VALUES (?, ?)`,
    ...params
  );
}

async function updateCategory(id: CategoryId, data: PartialCategoryWithoutId) {
  return run(`
      UPDATE categories
      SET ${createUpdateParams(data)}
      WHERE id = ?
    `, id);
}

async function getAllCategories() {
  const categories: Category[] | Error = await all(`
    SELECT * FROM categories
    `);
  
  return categories;
}

async function removeCategory(id: CategoryId) {
  return run(`DELETE FROM categories
      WHERE id = ?
    `, id);
}

export default {
  createCategory,
  updateCategory,
  getAllCategories,
  removeCategory
}