import { HttpStatus } from "../enums/http-status";
import {
  ProductId,
  ProductWithoutId,
  PartialProductWithoutId,
} from "../models/Product";
import serviceCandle from "../service/serviceCandle";
import { Request, Response } from 'express';


async function createCandle(
  req: Request<object, object, ProductWithoutId>,
  res: Response
) {
  try {
    const { name, count, price } = req.body;
    if (!name || !count || !price) {
      res.status(HttpStatus.BAD_REQUEST).json('Не заполенны поля')
      return
    }
    await serviceCandle.createCandle({ name, count, price });
    res.status(HttpStatus.CREATED).send('Успех');
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes("UNIQUE")) {
        //TODO добавить у остальных запросов такую ошибку
        res.status(HttpStatus.CONFLICT).json('Конфликт: уже существует');
        return
      }
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err.message);
      return
    }
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json('Неизвестная ошибка');
    return
  }
};
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
  req: Request<{ id: ProductId }, object, Partial<PartialProductWithoutId>>,
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

async function getCandles(req: Request, res: Response) {
  try {
    const data = await serviceCandle.getCandles();
    res.status(200).json(data);
  } catch (err) {
    if (err instanceof Error) {
      res.json({ message: err.message });
    }
  }
}


async function getCandle(req: Request<{ id: ProductId }>, res: Response) {
  try {

    const { id } = req.params
    const data = await serviceCandle.getCandle(id);
    console.log('data', data);

    res.status(200).json(data);
  } catch (err) {
    if (err instanceof Error) {
      res.json({ message: err.message });
    }
  }
}


export default { createCandle, removeCandle, updateCandle, getCandles, getCandle };
