import {pool} from "../database/database.js"

async function userCreateModel({name, email, role, password_h}) {
      
      const query = `INSERT INTO users (name, email, role, password_h)
                        VALUES ($1, $2, $3, $4)
                        RETURNING id`
      
      const values = [name, email, role, password_h]
      
      try {
            const result = await pool.query(query, values)
            return result
      }
      catch (error) {
            console.log("Error writing user to database", error.detail)
            throw(error)
      }
}

async function userGetByEmailModel({email}) {

      const query = `SELECT id, password_h, role 
                        FROM users
                        WHERE email = $1`

      const values = [email]

      try {
            const result = await pool.query(query, values)
            return result
      }
      catch (error) {
            console.log("Error geting user by email", error.detail)
      }
}

async function userGetByIdModel({id}) {
      
      const query = `SELECT name, email, role
                        FROM users
                        WHERE id = $1`
      
      const values = [id]

      try {
            const result = await pool.query(query, values)
            return result.rows[0]
      }
      catch (error) {
            console.log("Error geting user by id", error.detail)
      }
}

async function userDeleteModel({id}) {

      const query = `DELETE FROM users
                        WHERE id = $1`

      const values = [id]                  
      try {
            const result = await pool.query(query, values)
            return result
      }
      catch (error) {
            console.log("Error deleting user", error.detail)
      }
}


export { userCreateModel, userGetByEmailModel, userGetByIdModel, userDeleteModel }