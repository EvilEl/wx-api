import { Login, BDUser } from '../models/User'
import db from '../db/dbUser'

async function getUser(login: Login): Promise<BDUser> {
  return db.getUser(login)
}


export default { getUser }
