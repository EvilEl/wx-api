
import { run } from "./db";

async function createUsers(...params: unknown[]) {
  return run(
    `INSERT INTO users (
    login,
    password,
    )
    VALUES (?, ?)
    `,
    ...params
  );
}


export default { createUsers }
