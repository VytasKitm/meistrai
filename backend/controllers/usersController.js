import { usersCreateModel,
         userGetByEmail   
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

            const user_id = await usersCreateModel({
                  name,
                  email,
                  role: "user",
                  password_h: hashed_psw
            })

            res.status(200).json(user_id.rows[0].id)
      }
      catch (error) {
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
            const  {rows} = await userGetByEmail({email})
            console.log(rows)
      
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
                  {expiresIn: '1h'}
            )

            res.status(200).json({token})
      }
      catch (error) {
            next(error)
      }
}

export {userCreate, userLogin}