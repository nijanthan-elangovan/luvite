import mysql, { type Pool } from "mysql2/promise";

let pool: Pool;

function getPool() {
  if (!pool) {
    if (!process.env.DB_PASS) {
      throw new Error("DB_PASS environment variable is required");
    }
    pool = mysql.createPool({
      host: process.env.DB_HOST ?? "localhost",
      user: process.env.DB_USER ?? "luvite",
      password: process.env.DB_PASS,
      database: process.env.DB_NAME ?? "luvite",
      waitForConnections: true,
      connectionLimit: 5,
    });
  }
  return pool;
}

export default new Proxy({} as Pool, {
  get(_target, prop) {
    const p = getPool();
    const val = (p as never)[prop as never];
    return typeof val === "function" ? (val as Function).bind(p) : val;
  },
});
