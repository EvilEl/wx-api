import { run, get } from "./db";
import bcrypt from 'bcrypt'
import { addRefreshTokenColumn } from "./migration";

async function createTableProducts() {
  run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('candle', 'diffuser', 'sachet')),
    price INTEGER NOT NULL,
    count INTEGER NOT NULL,
    UNIQUE(name, type)
  )`);
}


async function createUsers() {
  await run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login TEXT UNIQUE,
    password TEXT NOT NULL,
    refreshToken TEXT
  )`);


  const row = await get("SELECT * FROM users WHERE login = ?", 'admin')
  if (!row) {
    const hashed = await bcrypt.hash(process.env.PASSWORD ?? '', 10)
    await run(`INSERT INTO users ( login, password) VALUES (?, ?)`, 'admin', hashed)
  }
}

async function createFilesTable() {
  await run(`CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    originalname TEXT NOT NULL,
    mimeType TEXT NOT NULL,
    size INTEGER NOT NULL DEFAULT 0,
    link TEXT DEFAULT NULL,
    base64 TEXT DEFAULT NULL,
    createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    idProduct INTEGER DEFAULT NULL
  )`);
}


async function createTable() {
  await createTableProducts();
  await createUsers();
  await createFilesTable();
  await addRefreshTokenColumn();
}

export { createTable };
