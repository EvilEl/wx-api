import { run, all, get } from "./db";
import { File, FileId, FileIdProduct } from '../models/File'

async function saveFile(fileData: File) {
  return run(
    `INSERT INTO files (
      filename,
      originalname,
      mimeType,
      size,
      link,
      base64,
      id,
      idProduct
    ) VALUES (?, ?, ?, ?, ?, ?, idProduct)`,
    fileData.filename,
    fileData.originalname,
    fileData.mimeType,
    fileData.size,
    fileData.link,
    fileData.base64,
    fileData.idProduct
  );
}

async function createFiles(files: File[]) {
  const placeholders = files.map(() => '(?, ?, ?, ?, ?, ?, ?, ?)').join(',');
  const values = files.flatMap(file => [
    file.filename,
    file.originalname,
    file.mimeType,
    file.size,
    file.link,
    file.base64,
    file.idProduct,
    new Date().toISOString()
  ]);

  return run(
    `INSERT INTO files (
      filename,
      originalname,
      mimeType,
      size,
      link,
      base64,
      idProduct,
      createdDate
    ) VALUES ${placeholders}`,
    ...values
  );
}

async function getFileById(id: number) {
  return get(`SELECT * FROM files WHERE id = ?`, id);
}

async function getAllFilesForIdProduct(id: FileIdProduct) {
  return all(`SELECT * FROM files WHERE idProduct = ?`, id);
}

async function getAllFiles() {
  return all(`SELECT * FROM files ORDER BY created_at DESC`);
}

async function deleteFile(id: FileId) {
  return run(`DELETE FROM files WHERE id = ?`, id);
}

async function deleteFilesIdProduct(id: FileIdProduct) {
  return run(`DELETE FROM files WHERE idProduct = ?`, id);
}


export default {
  saveFile,
  createFiles,
  getFileById,
  getAllFiles,
  deleteFile,
  getAllFilesForIdProduct,
  deleteFilesIdProduct
};
