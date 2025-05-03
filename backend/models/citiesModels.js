import {pool} from "../database/database.js"

async function cityCreateModel({name}) {

      const query = `INSERT INTO cities (name)
                        VALUES ($1)
                        RETURNING id`
      
      const values = [name]

      try {
            const result = await pool.query(query, values)
            return result
      }
      catch(error) {
            console.log("Error writing city to database", error)
      }
      
}

export { cityCreateModel }