import { mechanicCreateModel, mechanicDeleteModel, mechanicEditModel } from "../models/mechanicsModels.js";

async function mechanicCreate(req, res, next) {
      const {name, last_name, service_id} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)
      try {
            if (!name || !last_name || !service_id) {
                  const error = new Error("Truksta name/last_name/service_id")
                  return next(error)
            }
            const result = await mechanicCreateModel(req.body)
            res.status(200).json({
                  "mechanic_Id": result.rows[0].id
            })
      }
      catch(error) {
            next(error)
      }
}

async function mechanicEdit(req, res, next) {
      const {id, name, last_name, service_id, specialization_id} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)
      try {
            if (!id ||
                !name ||
                !last_name ||
                !service_id ||
                !specialization_id) {
                  
                  const error = new Error("Blogi mechaniko duomenys")
                  return next(error)
            }
            const result = await mechanicEditModel(req.body)
            res.status(200).json({
                  id,
                  name,
                  last_name,
                  service_id,
                  specialization_id
            })
      }
      catch (error) {
            next(error)
      }
}


async function mechanicDelete(req, res, next) {
      const {id} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)
      try {
            if (!id) {
                  const error = new Error("Truksta mechaniko id")
                  return next(error)
            }
            const result = await mechanicDeleteModel(req.body)
            res.status(200).end()
      }
      catch (error) {
            next(error)
      }

}

export { mechanicCreate, mechanicEdit, mechanicDelete }