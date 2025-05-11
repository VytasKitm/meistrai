import express from 'express'
import { mechanicCreate, mechanicsGetAll } from '../controllers/mechanicsController.js'
import authenticateUser from '../middlewares/authenticateUser.js'
import authenticateAdmin from '../middlewares/authenticateAdmin.js'

const mechanicsRouter = express.Router()

mechanicsRouter.route("/").post(mechanicCreate)
mechanicsRouter.route("/get").get(authenticateUser, mechanicsGetAll)    

export default mechanicsRouter