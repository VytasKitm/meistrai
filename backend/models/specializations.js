import {pool} from '../database/database.js'

async function specializationsGetAllModel() {

      const query = `SELECT id, name
                        FROM specializations`
      
      try {
            const result = await pool.query(query)
            return result.rows
      }
      catch (error) {
            console.log("Error getting all specializations from db", error.detail)
      }
}

export {specializationsGetAllModel}