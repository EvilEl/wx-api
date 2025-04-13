import { Login, ProfileUser } from '../models/User'
import db from '../db/dbUser'

async function getUser(login: Login): Promise<ProfileUser> {
  return db.getUser(login)
}


export default { getUser }
