import express from 'express'
import { userCreate, userLogin } from '../controllers/usersController.js'

const userRouter = express.Router()

userRouter.route("/").post(userCreate)
userRouter.route("/login").post(userLogin)

export default userRouter