import { Login, BDUser } from '../models/User'
import db from '../db/dbUser'
async function getUser(login: Login): Promise<BDUser> {
  const user = await db.getUser(login)
  if (user instanceof Error) {
    throw user
  }
  if (!user) {
    throw new Error('User not found')
  }
  return user
}

export default { getUser }
