import express from 'express'
import { serviceCreate, serviceDelete } from '../controllers/servicesController.js'

const serviceRouter = express.Router()

serviceRouter.route("/").post(serviceCreate).delete(serviceDelete)

export default serviceRouter