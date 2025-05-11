import {    cityCreateModel,
            cityDeleteModel,
            citiesGetAllModel
      } from "../models/citiesModels.js";

async function cityCreate(req, res, next) {
      const {cityName} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)
      try {
            if (!cityName) {
                  const error = new Error("Truksta miesto pavadinimo")
                  return next(error)
            } 
            const result = await cityCreateModel(req.body)
            res.status(200).json({"city_id": result.rows[0].id})
      }
      catch(error) {
             if (error.code === '23505') {
                  return res.status(409).json({error: 'City already exists', code: '23505'})
            }
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

async function citiesGetAll(req, res, next) {
      try {
            const cities = await citiesGetAllModel()
            res.status(200).json(cities)
      }
      catch (error){
            next(error)
      }
}

export { cityCreate, cityDelete, citiesGetAll }