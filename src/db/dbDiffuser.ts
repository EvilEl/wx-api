import { PartialProductWithoutId, ProductId } from "../models/Product";
import { createUpdateParams } from "../utils/formattedUpdateParams";
import { run, all, get } from "./db";

async function createDiffuser(...params: unknown[]) {
  return run(
    `INSERT INTO diffusers (
    name,
    count,
    price
    )
    VALUES (?, ?, ?)
    `,
    ...params
  );
}

async function removeDiffuser(id: ProductId) {
  return run(`DELETE FROM diffusers
      WHERE id = ${id}
    `);
}

async function updateDiffuser(id: ProductId, data: PartialProductWithoutId) {
  return run(`
      UPDATE candles
      SET ${createUpdateParams(data)}
      WHERE id = ${id}
    `);
}

async function getDiffusers() {
  return all(`
    SELECT * FROM diffusers
  `);
}

async function getDiffuser(id: ProductId) {
  const sql = 'SELECT * FROM diffusers WHERE id = ?'
  return get(sql, id);
}

getDiffuser
export default { createDiffuser, removeDiffuser, updateDiffuser, getDiffusers, getDiffuser };
