import {pool} from "../database/database.js"

async function serviceCreateModel({name, city_id}) {
      const query = `INSERT INTO services (name, city_id)
                        VALUES($1, $2)
                        RETURNING id`
      const values = [name, city_id]

      try {
            const result = await pool.query(query, values)
            return result.rows[0]
      }
      catch (error) {
            console.log("Error writing service to database", error.detail)
      }
}

async function serviceEditModel({id, name, city_id}) {
      const query = `UPDATE ONLY services
                        SET   name = $2,
                              city_id = $3
                        WHERE id = $1
                        RETURNING id, name, city_id`

      const values = [id, name, city_id]
      try {
            const result = await pool.query(query, values)
            return result.rows[0]
      }
      catch (error) {
            console.log("Error updating service", error.detail)
      }
}

async function serviceDeleteModel({id}) {
      const query = `DELETE FROM services
                        WHERE id = $1`

      const values = [id]
      try {
            const result = await pool.query(query, values)
            return result.rowCount
      }
      catch (error) {
            console.log("Error deleting service", error.detail)
      }
}

export {serviceCreateModel, serviceEditModel, serviceDeleteModel}