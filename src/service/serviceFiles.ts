import db from "../db/dbFiles";
import { File, FileId, FileIdProduct } from "../models/File";

async function createFiles(files: File[]) {
  return db.createFiles(files);
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




export default { createFiles, removeFile, removeFilesIdProduct, getAllFilesForIdProduct };
