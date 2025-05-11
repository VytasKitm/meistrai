import {pool} from "../database/database.js"

async function cityCreateModel({cityName}) {

      const query = `INSERT INTO cities (name)
                        VALUES ($1)
                        RETURNING id`
      
      const values = [cityName]

      try {
            const result = await pool.query(query, values)
            return result
      }
      catch(error) {
            console.log("Error creating city: ", error.detail)
            throw (error)
      }     
}

async function cityDeleteModel({id}) {
      const query = `DELETE FROM cities
                        WHERE id = $1`

      const values = [id]
      try {
            const result = await pool.query(query, values)
            return result
      }
      catch (error) {
            console.log("Error deleting city", error.detail)
      }
}

async function citiesGetAllModel() {

      const query = `SELECT id, name
                        FROM cities
                        ORDER BY name`
      
      try {
            const result = await pool.query(query)
            return result.rows
      }
      catch (error) {
            console.log("Error getting all cities from db", error.detail)
      }
}

export { cityCreateModel, cityDeleteModel, citiesGetAllModel }