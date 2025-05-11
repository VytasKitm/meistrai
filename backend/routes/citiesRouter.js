import express from 'express'
import { citiesGetAll, cityCreate, cityDelete } from "../controllers/citiesController.js"

const citiesRouter = express.Router()

citiesRouter.route("/").post(cityCreate).delete(cityDelete)
citiesRouter.route("/get").get(citiesGetAll)
// citiesRouter.route("/:id").delete(cityDelete)

export default citiesRouter