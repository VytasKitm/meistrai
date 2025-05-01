import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const {DATABASE_URL} = process.env

const pool = new pg.Pool({
      connectionString: DATABASE_URL,
      ssl: {
            rejectUnauthorized: false
      }
})

async function connectionTest() {
      let client
      try {
            client = await pool.connect();
            console.log('\x1b[32mDatabase connected.\x1b[0m')
      }
      catch (error) {
            console.log('\x1b[31mDatabase connection failed. database.js.\x1b[0m', error)
            process.exit(1)
      }
      finally {
            if (client) client.release()
      }
}

export {pool, connectionTest}