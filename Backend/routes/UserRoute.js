import express from 'express'
import { allBookmarksTweet, follow, getOtherUsers, getProfile, login, logout, register, tweetBookmark, unfollow, updateUserProfile } from '../controllers/UserController.js';
import isAuthenticated from '../config/auth.js';
import multer from "multer"

const userRouter = express.Router();

// // Image storage engine
// const storage = multer.diskStorage({
//     destination: "uploads",
//     filename: (req, file, cb) => {
//         return cb(null, `${Date.now()}${file.originalname}`)
//     }
//     // cb => Callback
// })

// const upload = multer({ storage: storage })


var storage = multer.diskStorage({
    destination : "uploads",
    filename : function (req, file, cb){
        cb(null, `${Date.now()}${file.originalname}`)
    }
})

var upload = multer({storage : storage})

var multipleUploads = upload.fields([{name : 'profileImage'}, {name : 'coverImage'}])


userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/logout", logout)
userRouter.put("/bookmark/:id", isAuthenticated, tweetBookmark)
userRouter.get("/getbookmark/:id", isAuthenticated, allBookmarksTweet)
userRouter.get("/profile/:id", isAuthenticated, getProfile)
userRouter.get("/otheruser/:id", isAuthenticated, getOtherUsers)
userRouter.post("/follow/:id", isAuthenticated, follow)
userRouter.post("/unfollow/:id", isAuthenticated, unfollow)
userRouter.post("/updateprofile/:id", isAuthenticated, multipleUploads, updateUserProfile)

export default userRouter;