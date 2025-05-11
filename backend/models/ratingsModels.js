import { pool } from "../database/database.js";

async function ratingsByUserModel({id}) {
      const query =     `SELECT mechanics.* 
                              FROM ratings 
                              JOIN mechanics 
                                    ON mechanics.id = ratings.mechanics_id 
                              WHERE ratings.users_id = $1`

      const values = [id]
      try {
            const ratings = await pool.query(query, values)
            return ratings.rows
      }
      catch (error) {
            console.log("Error getting ratings", error.detail)
            throw(error)
      }
}

async function ratingsByMechanicModel({id}) {
      const query =     `SELECT COUNT(*)
                              FROM ratings
                              WHERE mechanics_id = $1`

      const values = [id]
      try {
            const ratings = await pool.query(query, values)
            return ratings.rows
      }
      catch (error) {
            console.log("Error getting rating count", error.detail)
            throw(error)
      }
}

async function ratingsAddModel({users_id, mechanics_id}) {
      const query =     `INSERT INTO ratings (users_id, mechanics_id)
                              VALUES($1, $2)`

      const values = [users_id, mechanics_id]
      try {
            await pool.query(query, values)
      }
      catch (error) {
            console.log("Error writing rating", error)
            throw(error)
      }
}

async function ratingsDeleteModel({users_id, mechanics_id}) {
      const query =     `DELETE FROM ratings
                              WHERE users_id = $1
                              AND mechanics_id = $2`
      
      const values = [users_id, mechanics_id]
      try {
            await pool.query(query, values)
      }
      catch (error) {
            console.log("Error deleting rating", error)
            throw (error)
      }
}

export {ratingsByUserModel, ratingsByMechanicModel, ratingsAddModel, ratingsDeleteModel}

// list all masters a user has rated

// SELECT m.*
// FROM ratings r
// JOIN masters m ON m.id = r.master_id
// WHERE r.user_id = 42;

// count how many users rated a given mechanic

// SELECT COUNT(*) AS num_ratings
// FROM ratings
// WHERE master_id = 17;