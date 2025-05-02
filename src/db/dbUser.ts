import { Login, UserBase } from "../models/User";
import { get } from "./db";

async function getUser(login: Login): Promise<UserBase> {
  const result = await get<UserBase>('SELECT * FROM users WHERE login = ?', login);
  if (result instanceof Error) {
    throw result;
  }
  if (!result) {
    throw new Error('User not found');
  }
  return result;
}

export default { getUser }
