import express from 'express'
import { userCreate, userLogin, userGet } from '../controllers/usersController.js'
import  authenticateUser  from '../middlewares/authenticateUser.js'
import authenticateAdmin from '../middlewares/authenticateAdmin.js'

const userRouter = express.Router()

userRouter.route("/").post(userCreate)
userRouter.route("/:id").get(userGet)
userRouter.route("/login").post(userLogin)
userRouter.route("/protected").get(authenticateUser, authenticateAdmin)

export default userRouter