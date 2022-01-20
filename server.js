import cors from 'cors'
import express from 'express'
import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'
import dotenv from 'dotenv'
import connectDB from './db/connect.js'
// to skip using try and catch blocks
import 'express-async-errors'
import morgan from 'morgan'
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

import authenticateUser from './middleware/auth.js'

const app = express()
dotenv.config()

import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

app.use(cors())

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.resolve(__dirname, './client/build')))
// make data from body available
app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())


// middleware
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

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