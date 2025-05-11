import {    serviceCreateModel,
            serviceDeleteModel,
            serviceEditModel,
            servicesGetAllModel 
      } from "../models/servicesModels.js";

async function serviceCreate(req, res, next) {
      const {service_name, city_id} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)
      try {
            if (!service_name || !city_id) {
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
      const {id, service_name, city_id} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)
      try {
            if (!id || !service_name) {
                  const error = new Error("Blogi servico duomenys")
                  return next(error)
            }
            const result = await serviceEditModel(req.body)
            res.status(200).json({
                  id,
                  service_name,
                  city_id 
            })
            res.status(200).end()
      }
      catch (error) {
            next(error)
      }
}

async function serviceDelete(req, res, next) {
      const {id} = req.params
      console.log(`req.body: ${JSON.stringify(req.params)}`)
      try {
            if (!id) {
                  const error = new Error("Blogas serviso id")
                  return next(error)
            }
            const result = await serviceDeleteModel(req.params)

            if (result.rowCount === 0) {
                  const error = new Error("No service found")
                  throw (error)
            }

            res.status(200).end()
      }
      catch (error) {
            next(error)
      }
}

async function servicesGettAll(req, res, next) {
      try {
            const services = await servicesGetAllModel()
            console.log("servicesGetAll", services)
            res.status(200).json(services)
      }
      catch (error) {
            next(error)
      }
}

export { serviceCreate, serviceEdit, serviceDelete, servicesGettAll }