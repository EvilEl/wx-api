import { PartialProductWithoutId, ProductId } from "../models/Product";
import { createUpdateParams } from "../utils/formattedUpdateParams";
import { run, all } from "./db";

async function createSachet(...params: unknown[]) {
  return run(
    `INSERT INTO sachets (
    name,
    count,
    price
    )
    VALUES (?, ?, ?)
    `,
    ...params
  );
}

async function removeSachet(id: ProductId) {
  return run(`DELETE FROM sachets
      WHERE id = ${id}
    `);
}

async function updateSachet(id: ProductId, data: PartialProductWithoutId) {
  return run(`
      UPDATE candles
      SET ${createUpdateParams(data)}
      WHERE id = ${id}
    `);
}

async function getSachets() {
  return all(`
    SELECT * FROM sachets
  `);
}

export default { createSachet, removeSachet, updateSachet, getSachets };
