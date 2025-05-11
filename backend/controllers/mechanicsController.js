import {    mechanicCreateModel, 
            mechanicDeleteModel, 
            mechanicEditModel,
            mechanicsGetAllModel
      } from "../models/mechanicsModels.js";

async function mechanicCreate(req, res, next) {
      const {name, lastName, serviceId, specializationId} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)
      try {
            if (!name || !lastName || !serviceId || !specializationId) {
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

async function mechanicsGetAll(req, res, next) {
      try {
            const mechanics = await mechanicsGetAllModel()
            res.status(200).json(mechanics)
      }
      catch (error){
            next(error)
      }
}

async function mechanicEdit(req, res, next) {
      const {id, name, lastName, serviceId, specializationId} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)
      try {
            if (!id ||
                !name ||
                !lastName ) {
                  
                  const error = new Error("Blogi mechaniko duomenys")
                  return next(error)
            }
            const result = await mechanicEditModel(req.body)
            res.status(200).end()
      }
      catch (error) {
            next(error)
      }
}


async function mechanicDelete(req, res, next) {
      const {id} = req.params
      console.log(`req.body: ${JSON.stringify(req.params)}`)
      try {
            if (!id) {
                  const error = new Error("Truksta mechaniko id")
                  return next(error)
            }
            const result = await mechanicDeleteModel(req.params)
            res.status(200).end()
      }
      catch (error) {
            next(error)
      }

}

export { mechanicCreate, mechanicEdit, mechanicDelete, mechanicsGetAll}