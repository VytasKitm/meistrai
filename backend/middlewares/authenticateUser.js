import jwt from 'jsonwebtoken'

async function authenticateUser(req, res, next) {
      const auth = req.headers.authorization
      if(!auth || !auth.startsWith("Bearer ")) {
            return res.status(401).json({message: "Blogas headeris"})
      }
      const token = auth.split(' ')

      try {
            const payload  = jwt.verify(token[1], process.env.JWT_SECRET)
            req.user = {id: payload.userId, role: payload.userRole}
            console.log(payload)
            console.log(`User verified. id: ${payload.userId}. Role: ${payload.userRole}`)
            next()
      }
      catch (error) {
            error.status = 401
            next(error)
      }
}

export default authenticateUser