import sqlite3, { Database, RunResult } from "sqlite3";

const sqlite = sqlite3.verbose();

let _instance: Database | null = null;

function create(dbFileName: string): Promise<Database> {
  return new Promise((res, rej) => {
    const db = new sqlite.Database(dbFileName, (err: Error | null) => {
      if (err) {
        rej(err);
      } else {
        res(db);
      }
    });
  });
}

async function init(dbFileName: string) {
  _instance = await create(dbFileName);
}

function instance() {
  if (!_instance) {
    throw new Error(
      "The database has not been initialized. Please call init to use this method."
    );
  }
  return _instance;
}
function run(sql: string, ...params: unknown[]): Promise<RunResult | Error> {
  return new Promise((res, rej) => {
    if (!_instance) {
      return rej(new Error("db is not initialized"));
    }
    _instance.run(sql, params, function (err: Error | null) {
      if (err) {
        rej(err);
      }
      res(this);
    });
  });
}

function all<T>(sql: string, ...params: unknown[]): Promise<T[] | Error> {
  return new Promise((res, rej) => {
    if (!_instance) {
      return rej(new Error("db is not initialized"));
    }
    _instance.all<T>(sql, params, function (err: Error | null, rows: T[]) {
      if (err) {
        rej(err);
      }
      res(rows);
    });
  });
}

function get<T>(sql: string, ...params: unknown[]): Promise<T | undefined | Error> {
  return new Promise((resolve, reject) => {
    if (!_instance) {
      return reject(new Error("Database not initialized"));
    }
    _instance.get<T>(sql, params, function (err: Error | null, row: T | undefined) {
      if (err) {
        return reject(err);
      }
      resolve(row);
    });
  });
}


export { init, instance, run, all, get };
