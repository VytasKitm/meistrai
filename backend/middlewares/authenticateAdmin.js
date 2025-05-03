function authenticateAdmin(req, res, next) {
      const {role} = req.user
      console.log(`Admin authentication: id: ${id}, role: ${role} `)
      if (role === "admin") {
            next()
      }
      else {
            res.status(403).json({authorized: false})
      }
}

export default authenticateAdmin