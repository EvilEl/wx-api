import { HttpStatus } from "../enums/http-status";
import { Request, Response } from 'express';
import { CategoryId, CategoryWithoutId, PartialCategoryWithoutId } from "../models/Category";
import serviceCategory from "../service/serviceCategory";


async function createCategory(
  req: Request<object, object, CategoryWithoutId>,
  res: Response
) {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(HttpStatus.BAD_REQUEST).json('Не заполнены поля')
      return
    }
    const id = await serviceCategory.createCategory(name, description);
    if(id instanceof Error){
      res.status(HttpStatus.BAD_REQUEST).send(id)
      return
    }
    console.log('Создали продукт с id',id)
    res.status(HttpStatus.CREATED).send({id:id.lastID});
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

async function updateCategory(
  req: Request<{ id: CategoryId }, object, Partial<PartialCategoryWithoutId>>,
  res: Response
) {
  const { id } = req.params;
  const body = req.body;
  try {
    await serviceCategory.updateCategory(id, body);
    res.status(200).json();
  } catch (err) {
    if (err instanceof Error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  }
}

async function getAllCategory(req: Request, res: Response) {
  try {
    const data = await serviceCategory.getAllCategories();
    res.status(200).json(data);
  } catch (err) {
    if (err instanceof Error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  }
}

async function removeCategory(req: Request<{ id: CategoryId }>, res: Response) {
  const { id } = req.params;
  try {
    await serviceCategory.removeCategory(id);
    res.status(200).json();
  } catch (err) {
    if (err instanceof Error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  }
}

export default {
  createCategory,
  updateCategory,
  getAllCategory,
  removeCategory
}