import { mechanicsCreateModel } from "../models/mechanicsModels.js";

async function mechanicCreate(req, res, next) {
      const {name, last_name, service_id} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)
      try {
            if (!name || !last_name || !service_id) {
                  const error = new Error("Truksta name/last_name/service_id")
                  return next(error)
            }
            const result = await mechanicsCreateModel(req.body)
            res.status(200).json({
                  "mechanic_Id": result.rows[0].id
            })
      }
      catch(error) {
            next(error)
      }
}

export { mechanicCreate }