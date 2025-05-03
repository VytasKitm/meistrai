import express from 'express'
import { mechanicCreate } from '../controllers/mechanicsController.js'

const mechanicsRouter = express.Router()

mechanicsRouter.route("/").post(mechanicCreate)

export default mechanicsRouter