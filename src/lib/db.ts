import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST ?? "localhost",
  user: process.env.DB_USER ?? "luvite",
  password: process.env.DB_PASS ?? "Luvite2026!",
  database: process.env.DB_NAME ?? "luvite",
  waitForConnections: true,
  connectionLimit: 5,
});

export default pool;
