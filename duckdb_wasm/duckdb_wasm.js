/* import duckdb from "duckdb";

const db = new duckdb.Database(":memory:");
const conn = db.connect();

conn.run("CREATE TABLE people (id INTEGER, name VARCHAR)");
conn.run("INSERT INTO people VALUES (1, 'Alice'), (2, 'Bob')");

conn.all("SELECT * FROM people", (err, rows) => {
  if (err) throw err;
  console.log(rows);
  conn.close();
});
 */
import duckdb from "@duckdb/duckdb-wasm";

// Define bundles (WASM + worker)
const JSDELIVR_BUNDLES = {
  mvp: {
    mainModule:
      "https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@latest/dist/duckdb-mvp.wasm",
    mainWorker:
      "https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@latest/dist/duckdb-browser-mvp.worker.js",
  },
  eh: {
    mainModule:
      "https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@latest/dist/duckdb-eh.wasm",
    mainWorker:
      "https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@latest/dist/duckdb-browser-eh.worker.js",
  },
};

async function initDuckDB() {
  const bundle = await duckdb.selectBundle(JSDELIVR_BUNDLES);
  const worker = new Worker(bundle.mainWorker);
  const logger = new duckdb.ConsoleLogger();
  const db = new duckdb.AsyncDuckDB(logger, worker);
  await db.instantiate(bundle.mainModule);
  return db;
}

async function runQuery() {
  const db = await initDuckDB();
  const conn = await db.connect();

  await conn.query(`CREATE TABLE people (id INTEGER, name VARCHAR);`);
  await conn.query(`INSERT INTO people VALUES (1, 'Alice'), (2, 'Bob');`);

  const result = await conn.query(`SELECT * FROM people;`);
  console.log(result.toArray());

  conn.close();
  db.terminate();
}

runQuery();
