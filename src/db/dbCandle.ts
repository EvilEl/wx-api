import { PartialProductWithoutId, ProductId } from "../models/Product";
import { createUpdateParams } from "../utils/formattedUpdateParams";
import { run, all } from "./db";

async function createCandle(...params: unknown[]) {
  return run(
    `INSERT INTO candles (
    name,
    count,
    price
    )
    VALUES (?, ?, ?)
    `,
    ...params
  );
}

async function removeCandle(id: ProductId) {
  return run(`DELETE FROM candles
      WHERE id = ${id}
    `);
}

async function updateCandle(id: ProductId, data: PartialProductWithoutId) {
  return run(`
      UPDATE candles
      SET ${createUpdateParams(data)}
      WHERE id = ${id}
    `);
}

async function getCandles() {
  return all(`
    SELECT * FROM candles
  `);
}

export default { createCandle, removeCandle, updateCandle, getCandles };
