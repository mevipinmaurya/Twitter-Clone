import express from 'express'
import dotenv from "dotenv"
import databaseConnection from './config/database.js'
import userRouter from './routes/UserRoute.js'
import cookieParser from 'cookie-parser'

const app = express()

dotenv.config({
    path: ".env"
})
const port = process.env.PORT || 4000

// Database connection
databaseConnection();

// Middlewares
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(cookieParser())


// API Endpoints
app.use("/api/v1/user", userRouter)


app.get("/", (req, res) => {
    res.send("I am root")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})