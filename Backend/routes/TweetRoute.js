import express from "express"
import { createTweet, deleteTweet, getAllTweets, getFollowingTweets, likeDislike } from "../controllers/TweetController.js"
import isAuthenticated from "../config/auth.js";
const tweetRouter = express.Router()

tweetRouter.post("/create", isAuthenticated, createTweet)
tweetRouter.delete("/delete/:id", isAuthenticated, deleteTweet);
tweetRouter.put("/like/:id", isAuthenticated, likeDislike);
tweetRouter.get("/alltweets/:id", isAuthenticated, getAllTweets);
tweetRouter.get("/followingtweets/:id", isAuthenticated, getFollowingTweets);

export default tweetRouter;
