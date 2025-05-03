import { cityCreateModel } from "../models/citiesModels.js";

async function cityCreate(req, res, next) {
      const {name} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)
      try {
            if (!name) {
                  const error = new Error("Truksta miesto pavadinimo")
                  return next(error)
            } 
            const cityId = await cityCreateModel(req.body)
            res.status(200).json(cityId)
      }
      catch(error) {
            next(error)
      }
}

export { cityCreate }