import express from 'express'
import { cityCreate } from "../controllers/citiesController.js"

const citiesRouter = express.Router()

citiesRouter.route("/").post(cityCreate)

export default citiesRouter