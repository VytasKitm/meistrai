import express from 'express'
import { userCreate, userLogin, userGet, userGetAll, userDelete } from '../controllers/usersController.js'
import  authenticateUser  from '../middlewares/authenticateUser.js'
import authenticateAdmin from '../middlewares/authenticateAdmin.js'

const userRouter = express.Router()

userRouter.route("/create").post(userCreate)
userRouter.route("/get").get(userGetAll)
userRouter.route("/:id").get(userGet)
userRouter.route("/login").post(userLogin)
userRouter.route("/protected").get(authenticateUser, authenticateAdmin)
userRouter.route("/delete/:id").delete(authenticateUser, authenticateAdmin, userDelete)

export default userRouter