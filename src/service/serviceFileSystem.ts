import { FsModule } from '../utils/fsModule'
import path from 'path'


/**
  * Создает директории при запуске приложения
  * @param dir - массив сегментов пути. Например: ['uploads','products'] создаст 
  uploads/products
*/
export function initializeDirectories(dir:string[]):void{
// Создаем папку uploads при запуске приложения
const uploadsDir = path.join(__dirname, '../', ...dir)
FsModule.createDir(uploadsDir)
}