import express, { json } from 'express'
import cors from 'cors'
import errorHandler from '../middlewares/errorHandler.js'
import morgan from 'morgan'
import citiesRouter from '../routes/citiesRouter.js'
import mechanicsRouter from '../routes/mechanicsRouter.js'
import serviceRouter from '../routes/serviceRouter.js'
import userRouter from '../routes/userRouter.js'
import ratingsRouter from '../routes/ratingsRouter.js'
import specializationRouter from '../routes/specializationsRoute.js'
import searchRouter from '../routes/searchRouter.js'

const app = express()

app.use(
      morgan(
            'Received request \x1b[32m:method\x1b[36m :url\x1b[33m :status\x1b[0m'
      )
)
app.use(express.json())

app.use(cors())


app.use("/cities", citiesRouter)
app.use("/mechanics", mechanicsRouter)
app.use("/services", serviceRouter)
app.use("/users", userRouter)
app.use("/ratings", ratingsRouter)
app.use("/specializations", specializationRouter)
app.use("/search", searchRouter)


app.use(errorHandler)

export default app