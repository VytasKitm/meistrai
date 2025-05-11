import express from 'express'
import {    ratingsByMechanic,
            ratingsByUser,
            ratingsAdd,
            ratingsDelete
      } from '../controllers/ratingsController.js'
import authenticateUser from '../middlewares/authenticateUser.js'
import authenticateAdmin from '../middlewares/authenticateAdmin.js'

const ratingsRouter = express.Router()

ratingsRouter.route("/getUser/:id").get(authenticateUser, ratingsByUser)
ratingsRouter.route("/getMechanic/:id").get(authenticateUser, ratingsByMechanic)
ratingsRouter.route("/add").post(authenticateUser, ratingsAdd)
ratingsRouter.route("/delete").delete(authenticateUser, ratingsDelete)


export default ratingsRouter