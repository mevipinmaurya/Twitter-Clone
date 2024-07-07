import Tweet from "../models/TweetModel.js";
import User from "../models/UserModel.js";
import fs from 'fs'         // fs is 'file system' which is pre-build to the node js


// Create Tweet function
const createTweet = async (req, res) => {

    let image_filename = `${req.file.filename}`
    // console.log(req)

    try {
        const { description, id } = req.body;
        if (!description || !id) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        }
        const user = await User.findById(id).select("-password")
        const tweet = new Tweet({
            description: description,
            userId: id,
            userDetails: user,
            image: image_filename
        })
        await tweet.save()

        return res.status(200).json({
            success: true,
            message: "Tweet created successfully",
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Error"
        })
    }
}


// Delete tweet function
const deleteTweet = async (req, res) => {
    try {
        const { id } = req.params;

        const tweet = await Tweet.findById(id);
        // Also delete the 'uploads' folder image file
        fs.unlink(`uploads/${tweet.image}`, () => { })

        await Tweet.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "Tweet deleted successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Error"
        })
    }
}


// Like or dislike tweet
const likeDislike = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const tweet = await Tweet.findById(tweetId);
        if (tweet.likes.includes(loggedInUserId)) {
            //dislike
            await Tweet.findByIdAndUpdate(tweetId, { $pull: { likes: loggedInUserId } })
            res.status(200).json({
                message: "You disliked a tweet"
            })
        } else {
            //like
            await Tweet.findByIdAndUpdate(tweetId, { $push: { likes: loggedInUserId } })
            res.status(200).json({
                message: "You liked a tweet"
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


// Get all tweets
const getAllTweets = async (req, res) => {
    // Loggedin user tweets + Following user tweets
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id);
        const loggedInUserTweets = await Tweet.find({ userId: id })
        const followingUserTweets = await Promise.all(loggedInUser.following.map(async (otherUsersId) => {
            return await Tweet.find({ userId: otherUsersId })
        }))

        return res.status(200).json({
            tweets: loggedInUserTweets.concat(...followingUserTweets)
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Error"
        })
    }
}


// Get following tweets
const getFollowingTweets = async (req, res) => {
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id);
        const followingUserTweets = await Promise.all(loggedInUser.following.map(async (otherUsersId) => {
            return await Tweet.find({ userId: otherUsersId })
        }))
        return res.status(200).json({
            tweets: [].concat(...followingUserTweets)
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Error"
        })
    }
}


// Get my tweets
const GetMyTweets = async (req, res) => {
    try {
        const id = req.params.id;
        const loggedInUserTweet = await Tweet.find({ userId: id })
        return res.status(200).json({
            tweets: loggedInUserTweet
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Error"
        })
    }
}

export { createTweet, deleteTweet, likeDislike, getAllTweets, getFollowingTweets, GetMyTweets }