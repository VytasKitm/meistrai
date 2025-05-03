import pg from 'pg'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
dotenv.config({
      path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../.env')
})

const {DATABASE_URL} = process.env

const pool = new pg.Pool({
      connectionString: DATABASE_URL,
      ssl: {
            rejectUnauthorized: false
      }
})

pool.on('error', (error, client) => {
      client.query('SET search_path = meistrai_db, public')
      console.error('Unexpected error on idle Postgres client', error)
})

if (!DATABASE_URL) {
      console.log("Bad .env file/location")
      process.exit(1)
}

// console.log("pg Pool config:", pool.options)
// console.log("fallback config:", pool._config)


async function connectionTest() {
      try {
            await pool.query(`SELECT 1`);
            console.log('\x1b[32mDatabase connected.\x1b[0m')
      }
      catch (error) {
            console.log('\x1b[31mDatabase connection failed. database.js.\x1b[0m', error)
            process.exit(1)
      }
}

export {pool, connectionTest}