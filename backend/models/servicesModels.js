import {pool} from "../database/database.js"

async function serviceCreateModel({service_name, city_id}) {
      const query = `INSERT INTO services (name, city_id)
                        VALUES($1, $2)
                        RETURNING id`
      const values = [service_name, city_id]

      try {
            const result = await pool.query(query, values)
            return result.rows[0]
      }
      catch (error) {
            console.log("Error writing service to database", error.detail)
      }
}

async function serviceEditModel({id, service_name, city_id}) {
      const query = `UPDATE ONLY services
                        SET   name = $2,
                              city_id = COALESCE($3, city_id)
                        WHERE id = $1
                        RETURNING id, name, city_id`

      const values = [id, service_name, city_id]
      try {
            const result = await pool.query(query, values)
            return result.rows[0]
      }
      catch (error) {
            console.log("Error updating service", error.detail)
      }
}

async function servicesGetAllModel() {

      const query = `SELECT services.id, services.name AS service_name, cities.name AS city_name
                        FROM services
                        JOIN cities
                              ON cities.id = services.city_id
                        ORDER BY services.name`
      
      try {
            const result = await pool.query(query)
            return result.rows
      }
      catch (error) {
            console.log("Error getting all services from db", error.detail)
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
            console.log("Error deleting service", error)
            throw(error)
      }
}

export {serviceCreateModel, serviceEditModel, serviceDeleteModel, servicesGetAllModel}