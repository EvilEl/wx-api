import { run, get } from "./db";
import bcrypt from 'bcrypt'

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
    password TEXT NOT NULL
  )`);


  const row = await get("SELECT * FROM users WHERE login = ?", 'admin')
  if (!row) {
    const hashed = await bcrypt.hash(process.env.PASSWORD ?? '', 10)
    await run(`INSERT INTO users ( login, password) VALUES (?, ?)`, 'admin', hashed)
  }
}




function createTable() {
  createTableCandles();
  createTableDiffusers();
  createTableSachets();
  createUsers()
}

export { createTable };
