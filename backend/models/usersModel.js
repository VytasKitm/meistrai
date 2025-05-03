import {pool} from "../database/database.js"

async function usersCreateModel({name, email, role, password}) {
      
      const query = `INSERT INTO users (name, email, role, password)
                        VALUES ($1, $2, $3, $4)
                        RETURNING id`
      
      const values = [name, email, role, password]
      
      try {
            const result = await pool.query(query, values)
            return result
      }
      catch (error) {
            console.log("Error writing user to database", error)
      }
}

async function userGetByEmail({email}) {

      const query = `SELECT id, email 
                        FROM users
                        WHERE email = $1`

      const values = [email]

      try {
            const result = await pool.query(query, values)
            return result
      }
      catch (error) {
            console.log("Error geting user by email", error)
      }
}

export { usersCreateModel, userGetByEmail }