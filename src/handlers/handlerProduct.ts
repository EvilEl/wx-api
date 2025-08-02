import { HttpStatus } from "../enums/http-status";
import {
  ProductId,
  ProductWithoutId,
  PartialProductWithoutId,
  ProductType,
} from "../models/Product";
import serviceProduct from "../service/serviceProduct";
import { Request, Response } from 'express';

async function createProduct(
  req: Request<object, object, ProductWithoutId>,
  res: Response
) {
  try {
    const { name, type, count, price } = req.body;
    if (!name || !type || !count || !price) {
      res.status(HttpStatus.BAD_REQUEST).json('Не заполнены поля')
      return
    }
    await serviceProduct.createProduct({ name, type, count, price });
    res.status(HttpStatus.CREATED).send('Успех');
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

async function removeProduct(req: Request<{ id: ProductId }>, res: Response) {
  const { id } = req.params;
  try {
    await serviceProduct.removeProduct(id);
    res.status(200).json();
  } catch (err) {
    if (err instanceof Error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  }
}

async function updateProduct(
  req: Request<{ id: ProductId }, object, Partial<PartialProductWithoutId>>,
  res: Response
) {
  const { id } = req.params;
  const body = req.body;
  try {
    await serviceProduct.updateProduct(id, body);
    res.status(200).json();
  } catch (err) {
    if (err instanceof Error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  }
}

async function getAllProducts(req: Request, res: Response) {
  try {
    const data = await serviceProduct.getAllProducts();
    res.status(200).json(data);
  } catch (err) {
    if (err instanceof Error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  }
}

async function getProductsByType(req: Request<{ type: ProductType }>, res: Response) {
  try {
    const { type } = req.params;
    const data = await serviceProduct.getProductsByType(type);
    res.status(200).json(data);
  } catch (err) {
    if (err instanceof Error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  }
}

async function getProduct(req: Request<{ id: ProductId }>, res: Response) {
  try {
    const { id } = req.params
    const data = await serviceProduct.getProduct(id);
    res.status(200).json(data);
  } catch (err) {
    if (err instanceof Error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  }
}

export default { 
  createProduct, 
  removeProduct, 
  updateProduct, 
  getAllProducts, 
  getProductsByType,
  getProduct 
};