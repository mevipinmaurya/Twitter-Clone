import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


// user signup functionality
const register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        // Basic validation
        if (!name || !username || !email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        }
        const match = await User.findOne({ email })
        if (match) {
            return res.status(500).json({
                success: false,
                message: "User already exist"
            })
        }

        const hashPass = await bcryptjs.hash(password, 10)
        const user = new User({
            name: name,
            username: username,
            email: email,
            password: hashPass,
        })

        await user.save();
        return res.status(200).json({
            success: true,
            message: "Account created successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Error"
        })
    }
}

// user login functionality
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User does not exist"
            })
        }
        const matchPass = await bcryptjs.compare(password, user.password);

        if (!matchPass) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password !!"
            })
        }

        const tokenData = {
            userId: user._id
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" })

        return res.status(200).cookie("token", token, { expiresIn: "1d", httpOnly: true }).json({
            success: true,
            message: `Welcome back ${user.name}`
        })

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Error"
        })
    }
}


// User logout functionality
const logout = (req, res)=>{
    return res.cookie("token", "", {expiresIn : Date(Date.now())}).json({
        success : true,
        message : "User logged out successfully"
    })
}



export { register, login, logout }