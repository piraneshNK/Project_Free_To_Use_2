import "server-only"
import postgres from "postgres"

let sql

export function getSql() {
  if (sql) return sql

  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error("DATABASE_URL must be configured")
  }

  sql = postgres(connectionString)
  return sql
}