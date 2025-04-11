import dbSachet from "../db/dbSachet";
import {
  PartialProductWithoutId,
  ProductId,
  ProductWithoutId,
} from "../models/Product";

async function createSachet({ name, count, price }: ProductWithoutId) {
  return dbSachet.createSachet(name, count, price);
}

async function removeSachet(id: ProductId) {
  return dbSachet.removeSachet(id);
}

async function updateSachet(
  id: ProductId,
  data: Partial<PartialProductWithoutId>
) {
  return dbSachet.updateSachet(id, data);
}

async function getSachets() {
  return dbSachet.getSachets();
}

async function getSachet(id: ProductId) {
  return dbSachet.getSachet(id);
}

export default { createSachet, removeSachet, updateSachet, getSachets, getSachet };
