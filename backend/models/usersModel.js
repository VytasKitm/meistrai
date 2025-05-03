import {pool} from "../database/database.js"

async function usersCreateModel({name, email, role, password_h}) {
      
      const query = `INSERT INTO users (name, email, role, password_h)
                        VALUES ($1, $2, $3, $4)
                        RETURNING id`
      
      const values = [name, email, role, password_h]
      
      try {
            const result = await pool.query(query, values)
            return result
      }
      catch (error) {
            console.log("Error writing user to database", error)
      }
}

async function userGetByEmail({email}) {

      const query = `SELECT id, password_h, role 
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

async function userGetById({id}) {
      
      const query = `SELECT name, email, role
                        FROM users
                        WHERE id = $1`
      
      const values = [id]

      try {
            const result = await pool.query(query, values)
            return result
      }
      catch (error) {
            console.log("Error geting user by id", error)
      }
}

async function userDelete({id}) {

      const query = `DELETE FROM users
                        WHERE id = $1`

      const values = [id]                  
      try {
            const result = await pool.query(query, values)
            return result
      }
      catch (error) {
            console.log("Error deleting user")
      }
}


export { usersCreateModel, userGetByEmail, userGetById, userDelete }