import {pool} from "../database/database.js"


async function mechanicCreateModel({name, lastName, serviceId, specializationId}) {
      const query = `INSERT INTO mechanics (name, last_name, service_id, specialization_id)
                        VALUES ($1, $2, $3, $4)
                        RETURNING id`
      const values = [name, lastName, serviceId, specializationId]

      try {
            const result = await pool.query(query, values)
            return result
      }
      catch(error) {
            console.log("Error writing mechanic to database", error.detail)
            throw (error)
      }
}


async function mechanicEditModel({id, name, lastName, serviceId, specializationId}) {
      const query = `UPDATE ONLY mechanics
                        SET   name = $2,
                              last_name = $3,
                              service_id = COALESCE($4, service_id),
                              specialization_id = COALESCE($5, specialization_id)
                        WHERE id = $1
                        RETURNING id, name, last_name, service_id, specialization_id`

      const values = [id, name, lastName, serviceId, specializationId]
      try {
            const result = await pool.query(query, values)
            return result
      }
      catch (error) {
            console.log("Error updating mechanic", error)
            throw(error)
      }
}

async function mechanicsGetAllModel() {

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
                              GROUP BY
                                    mechanics.id, mechanics_name, mechanics_last_name, service_name, city_name, specialization_name, rating
                              ORDER BY mechanics.last_name`
      
      try {
            const result = await pool.query(query)
            return result.rows
      }
      catch (error) {
            console.log("Error getting all mechanics from db", error
            )
      }
}


async function mechanicDeleteModel({id}) {
      const query = `DELETE FROM mechanics
                        WHERE id = $1`

      const values = [id]
      try {
            const result = await pool.query(query, values)
            return result
      }
      catch (error) {
            console.log("Error deleting mechanic", error.detail)
      }
}

export { mechanicCreateModel, mechanicDeleteModel, mechanicEditModel, mechanicsGetAllModel}


// list all masters a user has rated

// SELECT m.*
// FROM ratings r
// JOIN masters m ON m.id = r.master_id
// WHERE r.user_id = 42;

// count how many users rated a given mechanic

// SELECT COUNT(*) AS num_ratings
// FROM ratings
// WHERE master_id = 17;
