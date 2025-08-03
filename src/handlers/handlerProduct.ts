import { HttpStatus } from "../enums/http-status";
import {
  ProductId,
  ProductWithoutId,
  PartialProductWithoutId,
  ProductType,
} from "../models/Product";
import serviceProduct from "../service/serviceProduct";
import serviceFiles from "../service/serviceFiles";
import { Request, Response } from 'express';
import { File, FileIdProduct } from "../models/File";
import fs from 'fs';
import path from 'path';

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
    const id = await serviceProduct.createProduct({ name, type, count, price });
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

async function uploadFileToProduct(
  req: Request<{ id: string }, object, File>,
  res: Response
) {
  try {
    const { id } = req.params;
    const { filename, originalname, mimeType, size, base64 } = req.body;
    
    if (!filename || !mimeType || !size || !base64) {
      res.status(HttpStatus.BAD_REQUEST).json('Не заполнены поля');
      return;
    }
    
    // Генерируем уникальное имя файла
    const uniqueFilename = `${Date.now()}_${filename}`;
    const filePath = `uploads/products/${uniqueFilename}`;
    const fullPath = path.join(__dirname, '../', filePath);
    
    // Сохраняем файл на диск
    const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
    fs.writeFileSync(fullPath, base64Data, 'base64');
    
    // Создаем запись в БД с путем к файлу
    const fileData = {
      filename: uniqueFilename,
      originalname,
      mimeType,
      size,
      link: `/uploads/products/${uniqueFilename}`,
      base64: null, // Не сохраняем base64 в БД
      idProduct: parseInt(id),
      visible:true
    } ; 
    
    await serviceFiles.createFile(fileData);
    res.status(HttpStatus.CREATED).json({
      message: 'Файл загружен успешно',
      url: `/uploads/products/${uniqueFilename}`
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: err.message
      });
      return
    }
  }
}

async function getProductFiles(req: Request<{ id: FileIdProduct }>, res: Response) {
  try {
    const { id } = req.params;
    const data = await serviceFiles.getAllFilesForIdProduct(id);
    res.status(200).json(data);
  } catch (err) {
    if (err instanceof Error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  }
}

async function deleteProductFiles(req: Request<{ id: FileIdProduct }>, res: Response) {
  try {
    const { id } = req.params;
    await serviceFiles.removeFilesIdProduct(id);
    res.status(200).json('Файлы удалены успешно');
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
  getProduct,
  uploadFileToProduct,
  getProductFiles,
  deleteProductFiles
};