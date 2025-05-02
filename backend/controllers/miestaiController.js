import { miestasCreateModel } from "../models/miestaiModels.js";

async function miestasCreate(req, res, next) {
      const {pavadinimas} = req.body
      try {
            if (!pavadinimas) {
                  const error = new Error("Truksta miesto pavadinimo")
                  return next(error)
            } 
            const miestasId = await miestasCreateModel(req.body)
            res.status(200).json(miestasId)
      }
      catch(error) {
            next(error)
      }
}

export {miestasCreate}