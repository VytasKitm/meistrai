import {pool} from "../database/database.js"

async function miestasCreateModel({pavadinimas}) {

      const query = `INSERT INTO miestai (pavadinimas)
                        VALUES ($1)
                        RETURNING id`
      
      const values = [pavadinimas]

      try {
            const result = await pool.query(query, values)
            return result
      }
      catch(error) {
            console.log("Error writing city to database", error)
      }
      
}

export { miestasCreateModel }