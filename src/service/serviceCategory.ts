import dbCategory from "../db/dbCategories";
import { CategoryId, PartialCategoryWithoutId } from "../models/Category";

async function createCategory(name: string, description: string) {
  return dbCategory.createCategory(name, description);
}

async function updateCategory(id: CategoryId, data: PartialCategoryWithoutId) {
  return dbCategory.updateCategory(id, data);
}

async function getAllCategories() {
  return dbCategory.getAllCategories();
}

async function removeCategory(id:CategoryId){
  return dbCategory.removeCategory(id);
}


export default { createCategory,getAllCategories,updateCategory,removeCategory };