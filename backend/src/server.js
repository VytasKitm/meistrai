import app from "./app.js";
import dotenv from 'dotenv'
import pg from "pg";
dotenv.config()

const {
      PORT,
      HOST,
      DATABASE_URL,
} = process.env


const pool = new pg.Pool({
      connectionString: DATABASE_URL,
      ssl: {
            rejectUnauthorized: false
      },
      // enableChannelBinding: false
})



async function startServer() {
      try {
            await testConnection()
            app.listen(PORT, () => {
                  console.log(`Server started at http://${HOST}:${PORT}`)
            })
      } 
      catch (error) {
            console.log(`Failed to start server /src/server.js ${error}`)
      }
}

async function testConnection() {
      try {
            const nowDate = await pool.query(`SELECT NOW() AS now`)
            console.log('Postgres time is: ', nowDate.rows)

            await pool.query(`
                  CREATE TABLE IF NOT EXISTS test_connection (
                        id SERIAL PRIMARY KEY,
                        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                        )
                  `)
            console.log('test_connection table is ready')
      }
      catch (error) {
            console.log('Database test failed', error)
            process.exit(1)
      }
}

startServer()
