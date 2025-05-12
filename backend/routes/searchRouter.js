import express from 'express'
import { search } from '../controllers/searchController.js'
import authenticateUser from '../middlewares/authenticateUser.js'

const searchRouter = express.Router()

searchRouter.route("/").get(authenticateUser, search)

export default searchRouter