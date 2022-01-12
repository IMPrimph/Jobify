import cors from 'cors'
import express from 'express'
import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'
import dotenv from 'dotenv'
import connectDB from './db/connect.js'
// to skip using try and catch blocks
import 'express-async-errors'
import morgan from 'morgan'

const app = express()
dotenv.config()

import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

app.use(cors())
// make data from body available
app.use(express.json())

// middleware
app.get("/", (req, res) => {
    res.send('Welcome')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT, () => {
            console.log(`Server started running on Port ${PORT}...`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()