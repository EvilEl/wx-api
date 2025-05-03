interface File {
  filename: string;
  originalname: string;
  mimeType: string;
  size: number;
  link: string;
  base64: string;
  idProduct: number;
}


interface FileBase extends File {
  id: number
}

type FileId = Pick<FileBase, "id">;
type FileIdProduct = Pick<FileBase, "idProduct">;

export { File, FileId, FileBase, FileIdProduct }
