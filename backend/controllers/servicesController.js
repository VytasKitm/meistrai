import { serviceCreateModel, serviceDeleteModel, serviceEditModel } from "../models/servicesModels.js";

async function serviceCreate(req, res, next) {
      const {name, city_id} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)
      try {
            if (!name || !city_id) {
                  const error = new Error("Truksta serviso pavadinimo/miesto")
                  return next(error)
            }
            const result = await serviceCreateModel(req.body)
            console.log(result)
            res.status(200).json({
                  "service_id": result.id
            })
      }
      catch(error) {
            next(error)
      }
}

async function serviceEdit(req, res, next) {
      const {id, name, city_id} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)
      try {
            if (!id || !name || !city_id) {
                  const error = new Error("Blogi servico duomenys")
                  return next(error)
            }
            const result = await serviceEditModel(req.body)
            res.status(200).json({
                  id,
                  name,
                  city_id 
            })
      }
      catch (error) {
            next(error)
      }
}

async function serviceDelete(req, res, next) {
      const {id} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)
      try {
            if (!id) {
                  const error = new Error("Blogas serviso id")
                  return next(error)
            }
            await serviceDeleteModel(req.body)
            res.status(200).end()
      }
      catch (error) {
            next(error)
      }
}

export { serviceCreate, serviceEdit, serviceDelete }