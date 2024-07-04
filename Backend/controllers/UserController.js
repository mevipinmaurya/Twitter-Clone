import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import Tweet from "../models/TweetModel.js";


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
const logout = (req, res) => {
    return res.cookie("token", "", { expiresIn: Date(Date.now()) }).json({
        success: true,
        message: "User logged out successfully"
    })
}


// Tweets Bookmark functionality
const tweetBookmark = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const user = await User.findById(loggedInUserId)
        if (user.bookmarks.includes(tweetId)) {
            // remove
            await User.findByIdAndUpdate(loggedInUserId, { $pull: { bookmarks: tweetId } })
            return res.status(200).json({
                message: "Tweet removed from bookmark"
            })
        } else {
            // add
            await User.findByIdAndUpdate(loggedInUserId, { $push: { bookmarks: tweetId } })
            return res.status(200).json({
                message: "Tweet added to bookmark"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Error"
        })
    }
}


// Getting User profile
const getProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).select("-password");
        return res.status(200).json({
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Error"
        })
    }
}


// Get other users (For suggestion to follow)
const getOtherUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const otherUsers = await User.find({ _id: { $ne: id } })
        if (!otherUsers) {
            return res.status(401).json({
                message: "No users are found"
            })
        }
        return res.status(200).json({
            otherUsers
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Error"
        })
    }
}


// User Following and followers functionality 
const follow = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;
        const loggedInUser = await User.findById(loggedInUserId)
        const user = await User.findById(userId)
        if (!user.followers.includes(loggedInUserId)) {
            await user.updateOne({ $push: { followers: loggedInUserId } })
            await loggedInUser.updateOne({ $push: { following: userId } })
        } else {
            // await user.updateOne({$pull : {followers : loggedInUserId}})
            // await loggedInUser.updateOne({$pull : {following : userId}})
            return res.status(400).json({
                message: `You already followed ${user.name}`
            })
        }

        return res.status(200).json({
            success: true,
            message: `You are now following ${user.name}`
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Error"
        })
    }
}


// User Unfollow functionality
const unfollow = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;
        const loggedInUser = await User.findById(loggedInUserId)
        const user = await User.findById(userId)
        if (loggedInUser.following.includes(userId)) {
            await user.updateOne({ $pull: { followers: loggedInUserId } })
            await loggedInUser.updateOne({ $pull: { following: userId } })
        } else {
            return res.status(400).json({
                message: `You have not followed ${user.name}`
            })
        }

        return res.status(200).json({
            success: true,
            message: `You just unfollowed ${user.name}`
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Error"
        })
    }
}

export { register, login, logout, tweetBookmark, getProfile, getOtherUsers, follow, unfollow }