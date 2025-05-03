import { serviceCreateModel } from "../models/servicesModels.js";

async function serviceCreate(req, res, next) {
      const {name, city_id} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)
      try {
            if (!name || !city_id) {
                  const error = new Error("Truksta serviso pavadinimo/miesto")
                  return next(error)
            }
            const serviceId = await serviceCreateModel(req.body)
            res.status(200).json({
                  "service_id": serviceId
            })
      }
      catch(error) {
            next(error)
      }
}

export { serviceCreate }