import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config({
    path: "../config/.env"
})

// To check user validation
const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log(token)
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User is not authenticated"
            })
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        console.log(decode)
        req.user = decode.userId;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Error"
        })
    }
}


export default isAuthenticated;