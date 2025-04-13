import { Login } from "../models/User";
import { run, all, get } from "./db";

async function getUser(login: Login) {
  return get('SELECT * FROM users WHERE login = ?',
    login
  )
}


export default { getUser }
