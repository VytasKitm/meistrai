import express from 'express'
import { mechanicCreate, mechanicsGetAll, mechanicEdit, mechanicDelete } from '../controllers/mechanicsController.js'
import authenticateUser from '../middlewares/authenticateUser.js'
import authenticateAdmin from '../middlewares/authenticateAdmin.js'

const mechanicsRouter = express.Router()

mechanicsRouter.route("/create").post(authenticateUser, authenticateAdmin, mechanicCreate)
mechanicsRouter.route("/get").get(authenticateUser, mechanicsGetAll)
mechanicsRouter.route("/update").put(authenticateUser, authenticateAdmin, mechanicEdit)    
mechanicsRouter.route("/delete/:id").delete(authenticateUser, authenticateAdmin, mechanicDelete)

export default mechanicsRouter