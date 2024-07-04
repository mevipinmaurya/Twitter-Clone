import mongoose from 'mongoose'
import dotenv from "dotenv"

dotenv.config({
    path: "../config/.env"
})

const databaseConnection = () => {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("Connected to database")
    }).catch((error) => {
        console.log(error)
    })
}

export default databaseConnection;