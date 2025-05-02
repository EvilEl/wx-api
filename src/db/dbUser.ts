import { Login, BDUser } from "../models/User";
import { get } from "./db";

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

export default { getUser }
