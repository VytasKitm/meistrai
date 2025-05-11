import express from 'express'
import {    ratingsByMechanic,
            ratingsByUser,
            ratingsAdd
      } from '../controllers/ratingsController.js'
import authenticateUser from '../middlewares/authenticateUser.js'
import authenticateAdmin from '../middlewares/authenticateAdmin.js'

const ratingsRouter = express.Router()

ratingsRouter.route("/getUser/:id").get(authenticateUser, ratingsByUser)
ratingsRouter.route("/getMechanic/:id").get(authenticateUser, ratingsByMechanic)
ratingsRouter.route("/ratingAdd").post(authenticateUser, ratingsAdd)


export default ratingsRouter