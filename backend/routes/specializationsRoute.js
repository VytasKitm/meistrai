import express from 'express'
import { specializationsGetAll } from '../controllers/specializationsController.js'
import authenticateUser from '../middlewares/authenticateUser.js'

const specializationRouter = express.Router()

specializationRouter.route("/get").get(authenticateUser, specializationsGetAll)

export default specializationRouter

