import Tweet from "../models/TweetModel.js";


// Create Tweet function
const createTweet = async (req, res) => {
    try {
        const { description, id } = req.body;
        if (!description || !id) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        }
        const tweet = new Tweet({
            description: description,
            userId: id
        })
        await tweet.save()

        return res.status(200).json({
            success: true,
            message: "Tweet created successfully"
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
                message: "User disliked your tweet"
            })
        } else {
            //like
            await Tweet.findByIdAndUpdate(tweetId, { $push: { likes: loggedInUserId } })
            res.status(200).json({
                message: "User liked your tweet"
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
const getAllTweets = async (req, res)=>{
    try {
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Error"
        })
    }
}

export { createTweet, deleteTweet, likeDislike, getAllTweets }