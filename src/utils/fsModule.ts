import fs from 'fs'

export class FsModule {
  static createDir(path:string) {
    if(!fs.existsSync(path)) {
      fs.mkdirSync(path,{ recursive:true})
    }
  }
}