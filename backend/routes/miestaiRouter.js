import express from 'express'
import { miestasCreate } from "../controllers/miestaiController.js"

const miestaiRouter = express.Router()

miestaiRouter.route("/").post(miestasCreate)

export default miestaiRouter