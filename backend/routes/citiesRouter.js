import express from 'express'
import { cityCreate, cityDelete } from "../controllers/citiesController.js"

const citiesRouter = express.Router()

citiesRouter.route("/").post(cityCreate).delete(cityDelete)
// citiesRouter.route("/:id").delete(cityDelete)

export default citiesRouter