import express from 'express'
import dotenv from "dotenv"
import databaseConnection from './config/database.js'
import userRouter from './routes/UserRoute.js'
import cookieParser from 'cookie-parser'
import tweetRouter from './routes/TweetRoute.js'
import cors from "cors"

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
app.use(cors())
// const corsOption = {
//     origin : "http://localhost:3000",
//     credentials : true,
// }
// app.use(cors(corsOption))

// API Endpoints
app.use("/api/v1/user", userRouter)
app.use("/api/v1/tweet", tweetRouter)


app.get("/", (req, res) => {
    res.send("I am root")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})