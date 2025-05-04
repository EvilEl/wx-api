import db from "../db/dbFiles";
import { File, FileId, FileIdProduct } from "../models/File";

async function createFile(file: File) {
  return db.createFile(file);
}

async function removeFile(id: FileId) {
  return db.deleteFile(id);
}

async function removeFilesIdProduct(id: FileIdProduct) {
  return db.deleteFilesIdProduct(id);
}

async function getAllFilesForIdProduct(id: FileIdProduct) {
  return db.getAllFilesForIdProduct(id)
}




export default { createFile, removeFile, removeFilesIdProduct, getAllFilesForIdProduct };
