import express from "express"
import { createTweet, deleteTweet, likeDislike } from "../controllers/TweetController.js"
import isAuthenticated from "../config/auth.js";
const tweetRouter = express.Router()

tweetRouter.post("/create", isAuthenticated, createTweet)
tweetRouter.delete("/delete/:id", isAuthenticated, deleteTweet);
tweetRouter.put("/like/:id", isAuthenticated, likeDislike);

export default tweetRouter;
