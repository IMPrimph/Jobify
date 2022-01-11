import express from 'express'
import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'
import dotenv from 'dotenv'
import connectDB from './db/connect.js'

const app = express()
dotenv.config()

// middleware

app.get("/", (req, res) => {
    res.send('Welcome')
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