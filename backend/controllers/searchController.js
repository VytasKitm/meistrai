import { searchModel } from "../models/searchModels.js";

async function search(req, res, next) {
      const {q} = req.query
      console.log(`req.query ratingsDelete: ${JSON.stringify(req.query)}`)

      if (!q) {
            res.status(400).json({message: "empty query"})
      }

      try{
            const result = await searchModel(q)
            res.status(200).json(result)
      }
      catch (error) {
            next(error)
      }
}

export {search}