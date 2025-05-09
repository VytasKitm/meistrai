import {    userCreateModel,
            userGetByEmailModel,   
            userGetByIdModel,
            userGetAllModel,
            userDeleteModel,
            userEditModel
 } from "../models/usersModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

async function userCreate(req, res, next) {
      const {name, email, password} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)
      try {
            if (!name || !email || !password) {
                  const error = new Error("Netinkamai uzpildyti registracijos duomenys!")
                  return next(error)
            }

            const salt = await bcrypt.genSalt(10)
            const hashed_psw = await bcrypt.hash(password, salt)

            const user = await userCreateModel({
                  name,
                  email,
                  role: "user",
                  password_h: hashed_psw
            })

            res.status(200).json(user.rows[0].id)
      }
      catch (error) {
            if (error.code === '23505') {
                  return res.status(409).json({error: 'Email already exists', code: '23505'})
            }
            next(error)
      }
}

async function userLogin(req, res, next) {
      const {email, password} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)

      if (!email || !password) {
            const error = new Error("Blogi prisijungimo duomenys")
            error.status = 400
            return next(error)
      }

      try {
            const  {rows} = await userGetByEmailModel({email})
            // console.log("userGetByEmail:",rows)
      
            if (rows.length === 0) {
                  const error = new Error("Tokio vartotojo nera")
                  error.status = 401
                  return next(error)
            }
      
            const {id, password_h, role} = rows[0]
      
            const check = await bcrypt.compare(password, password_h)
      
            if (!check) {
                  const error = new Error("Wrong password")
                  error.status = 401
                  return next(error)
            }

            const token = jwt.sign(
                  {userId: id, userRole: role},
                  process.env.JWT_SECRET,
                  {expiresIn: '24h'}
            )

            res.status(200).json({token})
      }
      catch (error) {
            next(error)
      }
}

async function userGet(req, res, next) {
      console.log(req.params)
      const {id} = req.params
      console.log(`req.body: ${JSON.stringify(req.params)}`)
      try {
            if (!id) {
                  const error = new Error("Nera id")
                  return next(error)
            }

            const user = await userGetByIdModel({id})
            console.log("userGet:", user)
            res.status(200).json({
                  user_name: user.name,
                  user_email: user.email
            })
      }
      catch (error) {
            next(error)
      }
}

async function userGetAll(req, res, next) {
      try {
            const users = await userGetAllModel()
            console.log("userGetAll", users)
            res.status(200).json(users)
      }
      catch (error) {
            next(error)
      }
}

async function userDelete(req, res, next) {
      const {id} = req.params
      console.log(`req.body: ${JSON.stringify(req.params)}`)

      try {
            if (!id) {
                  const error = new Error("Truksta id")
                  return next(error)
            }

            const result = await userDeleteModel({id})

            if (result.rowCount === 0) {
                  const error = new Error("User dont exists")
                  error.status = 404
                  throw error
            }

            return res.status(204).end()
      }
      catch (error) {
            console.error("userDelete error: ", error)
            next(error)
      }
}

async function userEdit(req, res, next) {
       const {id, name, email, role, password} = req.body
      console.log(`req.body: ${JSON.stringify(req.body)}`)
      try {
            if (!id ||
                !name ||
                !email ||
                !role) {
                  
                  const error = new Error("Blogi user duomenys")
                  return next(error)
            }

            let hashed_psw = null

            if (password) {
                  const salt = await bcrypt.genSalt(10)
                  hashed_psw = await bcrypt.hash(password, salt)
            }

            const result = await userEditModel({
                  id,
                  name,
                  email,
                  role,
                  password_h: hashed_psw
            })
            console.log("userEdit: ", result.rowCount)

            res.status(200).end()
      }
      catch (error) {
            next(error)
      }
}



export {userCreate, userLogin, userGet, userGetAll, userDelete, userEdit}