import serviceSachet from "../service/serviceSachet";
import { HttpStatus } from "../enums/http-status";

import { Request, Response } from "express";
import {
  PartialProductWithoutId,
  ProductId,
  ProductWithoutId,
} from "../models/Product";

async function createSachet(
  req: Request<{}, {}, ProductWithoutId>,
  res: Response
) {
  try {
    const { name, count, price } = req.body;
    await serviceSachet.createSachet({ name, count, price });
    res.status(200).json();
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes("UNIQUE")) {
        res.status(HttpStatus.CONFLICT);
      } else {
        res.status(HttpStatus.OK);
      }
      res.json({ message: err.message });
    }
    res.json({ message: "Ошибка" });
  }
}

async function removeSachet(req: Request<{ id: ProductId }>, res: Response) {
  const { id } = req.params;
  try {
    await serviceSachet.removeSachet(id);
    res.status(200).json();
  } catch (err) {
    if (err instanceof Error) {
      res.json({ message: err.message });
    }
  }
}

async function updateSachet(
  req: Request<{ id: ProductId }, {}, Partial<PartialProductWithoutId>>,
  res: Response
) {
  const { id } = req.params;
  const body = req.body;

  try {
    await serviceSachet.updateSachet(id, body);
    res.status(200).json();
  } catch (err) {
    if (err instanceof Error) {
      res.json({ message: err.message });
    }
  }
}

async function getSachet(_req: Request, res: Response) {
  try {
    const data = await serviceSachet.getSachets();
    res.status(200).json(data);
  } catch (err) {
    if (err instanceof Error) {
      res.json({ message: err.message });
    }
  }
}

export default { createSachet, removeSachet, updateSachet, getSachet };
