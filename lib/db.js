import "server-only"
import postgres from "postgres"

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("DATABASE_URL must be configured")
}

const sql = postgres(connectionString)

export default sql