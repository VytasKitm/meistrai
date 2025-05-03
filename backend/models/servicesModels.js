import {pool} from "../database/database.js"

async function serviceCreateModel({name, city_id}) {
      const query = `INSERT INTO services (name, city_id)
                        VALUES($1, $2)
                        RETURNING id`
      const values = [name, city_id]

      try {
            const result = await pool.query(query, values)
            return result.rows
      }
      catch (error) {
            console.log("Error writing service to database", error)
      }
}

export {serviceCreateModel}