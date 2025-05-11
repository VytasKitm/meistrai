import { specializationsGetAllModel} from '../models/specializations.js'


async function specializationsGetAll(req, res, next) {
      try {
            const specializations = await specializationsGetAllModel()
            res.status(200).json(specializations)
      }
      catch (error){
            next(error)
      }
}

export {specializationsGetAll}