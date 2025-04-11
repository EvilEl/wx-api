import dbCandle from "../db/dbCandle";
import {
  ProductWithoutId,
  ProductId,
  PartialProductWithoutId,
} from "../models/Product";

async function createCandle({ name, count, price }: ProductWithoutId) {
  return dbCandle.createCandle(name, count, price);
}

async function removeCandle(id: ProductId) {
  return dbCandle.removeCandle(id);
}

async function updateCandle(
  id: ProductId,
  data: Partial<PartialProductWithoutId>
) {
  return dbCandle.updateCandle(id, data);
}

async function getCandles() {
  return dbCandle.getCandles();
}



async function getCandle(id: ProductId) {
  return dbCandle.getCandle(id);
}


export default { createCandle, removeCandle, updateCandle, getCandles, getCandle };
