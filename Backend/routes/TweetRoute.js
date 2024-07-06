import express from "express"
import { createTweet, deleteTweet, getAllTweets, getFollowingTweets, GetMyTweets, likeDislike } from "../controllers/TweetController.js"
import isAuthenticated from "../config/auth.js";
import multer from "multer"
const tweetRouter = express.Router()

// Image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
    // cb => Callback
})

const upload = multer({ storage: storage })

tweetRouter.post("/create", isAuthenticated, upload.single('image'), createTweet)
tweetRouter.delete("/delete/:id", isAuthenticated, deleteTweet);
tweetRouter.put("/like/:id", isAuthenticated, likeDislike);
tweetRouter.get("/alltweets/:id", isAuthenticated, getAllTweets);
tweetRouter.get("/followingtweets/:id", isAuthenticated, getFollowingTweets);
tweetRouter.get("/getmytweets/:id", isAuthenticated, GetMyTweets);


export default tweetRouter;
