import { Login, UserBase } from '../models/User'
import db from '../db/dbUser'

async function getUser(login: Login): Promise<UserBase> {
  return db.getUser(login)
}


export default { getUser }
