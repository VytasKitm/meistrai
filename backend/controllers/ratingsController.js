import {    ratingsByUserModel,
            ratingsByMechanicModel,
            ratingsAddModel
      } from "../models/ratingsModels.js";


async function ratingsByUser (req, res, next) {
      const {id} = req.params
      console.log(`req.body: ${JSON.stringify(req.params)}`)

      if (!id) {
            const error = new Error("No User id. ratingsByUser", error)
            next(error)
      }
      
      try {
            const ratings = await ratingsByUserModel(req.params)
            res.status(200).json(ratings)
      }
      catch (error) {
            next(error)   
      }
}


async function ratingsByMechanic(req, res, next) {
      const {id} = req.params
      console.log(`req.body: ${JSON.stringify(req.params)}`)

            if (!id) {
            const error = new Error("No mechanic id. ratingsTotal", error)
            next(error)
      }

      try {
            const ratings = await ratingsByMechanicModel(req.params)
            res.status(200).json(ratings)
      }
      catch (error) {
            next(error)
      }
}

async function ratingsAdd(req, res, next) {
      const {users_id, mechanics_id} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)

      if (!users_id || !mechanics_id) {
                  const error = new Error("No user or mechanics Id, cant add rating")
                  next(error)
      }

      try {
            await ratingsAddModel(req.body)
            res.status(200).end()
      }
      catch (error) {
            next(error)
      }

}

export {ratingsByUser, ratingsByMechanic, ratingsAdd}