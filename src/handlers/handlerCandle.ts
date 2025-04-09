import { HttpStatus } from "../enums/http-status";
import {
  ProductId,
  ProductWithoutId,
  PartialProductWithoutId,
  IProduct,
} from "../models/Product";
import serviceCandle from "../service/serviceCandle";
import { Request, Response } from "express";

async function createCandle(
  req: Request<{}, {}, ProductWithoutId>,
  res: Response
) {
  try {
    const { name, count, price } = req.body;
    await serviceCandle.createCandle({ name, count, price });
    res.status(200).json();
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes("UNIQUE")) {
        res.status(HttpStatus.CONFLICT);
      }
      res.json({ message: err.message });
    }
    res.json({ message: "Ошибка" });
  }
}

async function removeCandle(req: Request<{ id: ProductId }>, res: Response) {
  const { id } = req.params;
  try {
    await serviceCandle.removeCandle(id);
    res.status(200).json();
  } catch (err) {
    if (err instanceof Error) {
      res.json({ message: err.message });
    }
  }
}

async function updateCandle(
  req: Request<{ id: ProductId }, {}, Partial<PartialProductWithoutId>>,
  res: Response
) {
  const { id } = req.params;
  const body = req.body;

  try {
    await serviceCandle.updateCandle(id, body);
    res.status(200).json();
  } catch (err) {
    if (err instanceof Error) {
      res.json({ message: err.message });
    }
  }
}

async function getCandles(_req: Request, res: Response) {
  try {
    const data = await serviceCandle.getCandles();
    res.status(200).json(data);
  } catch (err) {
    if (err instanceof Error) {
      res.json({ message: err.message });
    }
  }
}

export default { createCandle, removeCandle, updateCandle, getCandles };
