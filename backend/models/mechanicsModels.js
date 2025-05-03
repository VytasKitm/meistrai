import {pool} from "../database/database.js"


async function mechanicsCreateModel({name, last_name, service_id}) {
      const query = `INSERT INTO mechanics (name, last_name, service_id)
                        VALUES ($1, $2, $3)
                        RETURNING id`
      const values = [name, last_name, service_id]

      try {
            const result = await pool.query(query, values)
            return result
      }
      catch(error) {
            console.log("Error writing mechanic to database")
      }
}

export { mechanicsCreateModel}


// list all masters a user has rated

// SELECT m.*
// FROM ratings r
// JOIN masters m ON m.id = r.master_id
// WHERE r.user_id = 42;

// count how many users rated a given mechanic

// SELECT COUNT(*) AS num_ratings
// FROM ratings
// WHERE master_id = 17;
