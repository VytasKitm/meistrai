import express from 'express'
import { serviceCreate, serviceDelete, servicesGettAll, serviceEdit } from '../controllers/servicesController.js'
import authenticateUser from '../middlewares/authenticateUser.js'
import authenticateAdmin from '../middlewares/authenticateAdmin.js'

const serviceRouter = express.Router()

serviceRouter.route("/get").get(servicesGettAll)
serviceRouter.route("/create").post(authenticateUser, authenticateAdmin, serviceCreate)
serviceRouter.route("/update").put(authenticateUser, authenticateAdmin, serviceEdit)
serviceRouter.route("/delete/:id").delete(authenticateUser, authenticateAdmin, serviceDelete)

export default serviceRouter