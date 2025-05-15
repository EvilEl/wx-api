import serviceSachet from "../service/serviceSachet";
import { HttpStatus } from "../enums/http-status";

import { Request, Response } from "express";
import {
  PartialProductWithoutId,
  ProductId,
  ProductWithoutId,
} from "../models/Product";

async function createSachet(
  req: Request<object, object, ProductWithoutId>,
  res: Response
) {
  try {
    const { name, count, price } = req.body;
    await serviceSachet.createSachet({ name, count, price });
    res.status(200).json();
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes("UNIQUE")) {
        res.status(HttpStatus.CONFLICT).json('Конфликт: уже существует');
        return
      }
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err.message);
      return
    }
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json('Неизвестная ошибка');
    return
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
  req: Request<{ id: ProductId }, object, Partial<PartialProductWithoutId>>,
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

async function getSachets(_req: Request, res: Response) {
  try {
    const data = await serviceSachet.getSachets();
    res.status(200).json(data);
  } catch (err) {
    if (err instanceof Error) {
      res.json({ message: err.message });
    }
  }
}

async function getSachet(req: Request<{ id: ProductId }>, res: Response) {
  try {
    const { id } = req.params
    const data = await serviceSachet.getSachet(id);
    res.status(200).json(data);
  } catch (err) {
    if (err instanceof Error) {
      res.json({ message: err.message });
    }
  }
}

export default { createSachet, removeSachet, updateSachet, getSachets, getSachet };
