import express from 'express'
import { serviceCreate } from '../controllers/servicesController.js'

const serviceRouter = express.Router()

serviceRouter.route("/").post(serviceCreate)

export default serviceRouter