import { HttpStatus } from "../enums/http-status";
import serviceFiles from "../service/serviceFiles";
import { Request, Response } from 'express';
import {
  File, FileId, FileIdProduct
} from "../models/File";

async function createFile(
  req: Request<object, object, File>,
  res: Response
) {
  try {
    const file = req.body
    if (!file.filename ||
      !file.originalname ||
      !file.mimeType ||
      !file.size ||
      !file.link ||
      !file.base64 ||
      !file.idProduct
    ) {
      res.status(HttpStatus.BAD_REQUEST).json('Не заполнены поля');
      return;
    }
    await serviceFiles.createFile(file);
    res.status(HttpStatus.CREATED).json();
  } catch (err) {
    if (err instanceof Error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: err.message
      });
      return
    }
  }
}

async function removeFile(req: Request<{ id: FileId }>, res: Response) {
  const { id } = req.params;
  try {
    await serviceFiles.removeFile(id);
    res.status(200).json();
  } catch (err) {
    if (err instanceof Error) {
      res.json({ message: err.message });
    }
  }
}


async function removeFilesIdProduct(req: Request<{ id: FileIdProduct }>, res: Response) {
  const { id } = req.params;
  try {
    await serviceFiles.removeFilesIdProduct(id);
    res.status(200).json();
  } catch (err) {
    if (err instanceof Error) {
      res.json({ message: err.message });
    }
  }
}

async function getAllFilesForIdProduct(req: Request<{ id: FileIdProduct }>, res: Response) {
  try {
    const { id } = req.params;
    const data = await serviceFiles.getAllFilesForIdProduct(id);
    res.status(200).json(data);
  } catch (err) {
    if (err instanceof Error) {
      res.json({ message: err.message });
    }
  }
}

export default { createFile, removeFile, removeFilesIdProduct, getAllFilesForIdProduct, };
