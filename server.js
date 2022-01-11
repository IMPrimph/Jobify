import express from 'express'
import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'

const app = express()

// middleware

app.get("/", (req, res) => {
    res.send('Welcome')
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started running on Port ${PORT}...`)
})