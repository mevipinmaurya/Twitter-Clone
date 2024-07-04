import express from 'express'
import { follow, getOtherUsers, getProfile, login, logout, register, tweetBookmark, unfollow } from '../controllers/UserController.js';
import isAuthenticated from '../config/auth.js';

const userRouter = express.Router();

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/logout", logout)
userRouter.put("/bookmark/:id", isAuthenticated, tweetBookmark)
userRouter.get("/profile/:id", isAuthenticated, getProfile)
userRouter.get("/otheruser/:id", isAuthenticated, getOtherUsers)
userRouter.post("/follow/:id", isAuthenticated, follow)
userRouter.post("/unfollow/:id", isAuthenticated, unfollow)

export default userRouter;