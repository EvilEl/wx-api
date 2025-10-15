import { CategoryId, PartialCategoryWithoutId } from "../models/Category";
import { createUpdateParams } from "../utils/formattedUpdateParams";
import { run, all } from "./db";

async function createCategory(...params:unknown[]) {
  return await run(
    `INSERT INTO categories (name, description) VALUES (?, ?)`,
    ...params
  );
}

async function updateCategory(id: CategoryId, data: PartialCategoryWithoutId) {
  return await run(`
      UPDATE categories
      SET ${createUpdateParams(data)}
      WHERE id = ?
    `, id);
}

async function getAllCategories() {
  return await all(`SELECT * FROM categories`);
}

async function removeCategory(id: CategoryId) {
  return await run(`DELETE FROM categories
      WHERE id = ?
    `, id);
}

export default {
  createCategory,
  updateCategory,
  getAllCategories,
  removeCategory
}