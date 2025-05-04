import { cityCreateModel, cityDeleteModel } from "../models/citiesModels.js";

async function cityCreate(req, res, next) {
      const {name} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)
      try {
            if (!name) {
                  const error = new Error("Truksta miesto pavadinimo")
                  return next(error)
            } 
            const result = await cityCreateModel(req.body)
            res.status(200).json({"city_id": result.rows[0].id})
      }
      catch(error) {
            next(error)
      }
}

async function cityDelete(req, res, next) {
      const {id} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)
      try {
            if (!id) {
                  const error = new Error("Truksta miesto id")
                  return next(error)
            }
            const result = await cityDeleteModel(req.body)
            res.status(200).end()
      }
      catch(error) {
            next(error)
      }

}

export { cityCreate, cityDelete }