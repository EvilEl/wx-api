interface File {
  filename: string;
  originalname: string;
  mimeType: string;
  size: number;
  link: string;
  base64: string | null;
  idProduct: number;
  visible:boolean;
}
interface FileBase extends File {
  id: number
}

type FileId = Pick<FileBase, "id">;
type FileIdProduct = Pick<FileBase, "idProduct">;

interface RemoveFileFromProduct {
   idFile:FileId,
   idProduct: FileIdProduct 
}

export { File, FileId, FileBase, FileIdProduct, RemoveFileFromProduct }
