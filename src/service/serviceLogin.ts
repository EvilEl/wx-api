import { Login, BDUser } from '../models/User'
import dbUser from '../db/dbUser'

async function getUser(login: Login): Promise<BDUser> {
  const user = await dbUser.getUser(login)
  if (user instanceof Error) {
    throw user
  }
  if (!user) {
    throw new Error('User not found')
  }
  return user
}

async function saveRefreshToken(login: Login, refreshToken: string | null) {
 return await dbUser.updateUserRefreshToken(login, refreshToken);
}

export default { getUser, saveRefreshToken }
