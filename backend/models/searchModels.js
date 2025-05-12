import { pool } from '../database/database.js'

async function searchModel(q) {
      const pattern = `%${q}%`

      const query = `SELECT   mechanics.id,
                              mechanics.name AS mechanics_name,
                              mechanics.last_name AS mechanics_last_name,
                              services.name AS service_name,
                              cities.name AS city_name,
                              specializations.name AS specialization_name,
                              COUNT (ratings.mechanics_id) AS rating
                              FROM mechanics
                                    JOIN services
                                          ON mechanics.service_id = services.id
                                    JOIN cities
                                          ON services.city_id = cities.id
                                    JOIN specializations
                                          ON mechanics.specialization_id = specializations.id
                                    LEFT JOIN ratings
                                          ON ratings.mechanics_id = mechanics.id
                              WHERE
                                    mechanics.name ILIKE $1
                                 OR mechanics.last_name ILIKE $1
                                 OR cities.name ILIKE $1
                                 OR specializations.name ILIKE $1   
                              GROUP BY
                                    mechanics.id,
                                    mechanics_name, 
                                    mechanics_last_name, 
                                    service_name, city_name, 
                                    specialization_name, 
                                    rating
                              ORDER BY mechanics.last_name`

      const values = [pattern]

      try {
            const result = await pool.query(query, values)
            return result.rows
      }
      catch (error) {
            console.log("Error searching mechanics", error)
            throw (error)
      }
}

export {searchModel}