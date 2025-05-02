
function errorHandler(err, req, res, next) {
      const status = err?.status || 500
      const message = err?.message || "Server error (no info)"
      
      res.status(status).json({
            error: {
                  status: status,
                  message: message, 
            }
      })
}

export default errorHandler