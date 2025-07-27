import { Login, BDUser } from "../models/User";
import { createUpdateParams } from "../utils/formattedUpdateParams";
import { get, run } from "./db";

async function getUser(login: Login): Promise<BDUser> {
  const result = await get<BDUser>('SELECT * FROM users WHERE login = ?', login);
  if (result instanceof Error) {
    throw result;
  }
  if (!result) {
    throw new Error('User not found');
  }
  return result;
}


async function updateUserRefreshToken(login: Login, refreshToken: string | null) {
  return run(`
    UPDATE users
    SET ${createUpdateParams({refreshToken})}
    WHERE login = ?`, login);
}

export default { getUser, updateUserRefreshToken }
