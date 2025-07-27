import { run, get } from "./db";
import bcrypt from 'bcrypt'
import { addRefreshTokenColumn } from "./migration";

async function createTableCandles() {
  run(`CREATE TABLE IF NOT EXISTS candles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    price INTEGER NOT NULL,
    count INTEGER NOT NULL
  )`);
}

async function createTableDiffusers() {
  run(`CREATE TABLE IF NOT EXISTS diffusers(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    price INTEGER NOT NULL,
    count INTEGER NOT NULL
    )`);
}

async function createTableSachets() {
  run(`CREATE TABLE IF NOT EXISTS sachets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    price INTEGER NOT NULL,
    count INTEGER NOT NULL
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
  await createTableCandles();
  await createTableDiffusers();
  await createTableSachets();
  await createUsers();
  await createFilesTable();
  await addRefreshTokenColumn();
}

export { createTable };
