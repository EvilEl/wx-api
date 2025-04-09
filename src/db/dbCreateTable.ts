import { run } from "./db";
function creasteTableCandles() {
  run(`CREATE TABLE IF NOT EXISTS candles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    price INTEGER NOT NULL,
    count INTEGER NOT NULL
  )`);
}

function createTableDiffusers() {
  run(`CREATE TABLE IF NOT EXISTS diffusers(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    price INTEGER NOT NULL,
    count INTEGER NOT NULL
    )`);
}

function createTableSachets() {
  run(`CREATE TABLE IF NOT EXISTS sachets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    price INTEGER NOT NULL,
    count INTEGER NOT NULL
  )`);
}

export { creasteTableCandles };

function createTable() {
  creasteTableCandles();
  createTableDiffusers();
  createTableSachets();
}

export { createTable };
