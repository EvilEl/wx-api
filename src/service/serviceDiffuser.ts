import dbDiffuser from "../db/dbDiffuser";
import {
  ProductWithoutId,
  ProductId,
  PartialProductWithoutId,
} from "../models/Product";

async function createDiffuser({ name, count, price }: ProductWithoutId) {
  return dbDiffuser.createDiffuser(name, count, price);
}

async function removeDiffuser(id: ProductId) {
  return dbDiffuser.removeDiffuser(id);
}

async function updateDiffuser(
  id: ProductId,
  data: Partial<PartialProductWithoutId>
) {
  return dbDiffuser.updateDiffuser(id, data);
}

async function getDiffusers() {
  return dbDiffuser.getDiffusers();
}

export default { createDiffuser, removeDiffuser, updateDiffuser, getDiffusers };
