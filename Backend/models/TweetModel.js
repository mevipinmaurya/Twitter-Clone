import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const tweetSchema = new Schema(
    {
        description: { type: String, required: true },
        likes: { type: Array, default: [] },
        userId: { type: mongoose.Schema.Types.ObjectId },
        bookmarks: { type: Array, default: [] }
    },
    {
        timestamps: true
    }
)

const Tweet = mongoose.model("Tweet", tweetSchema);
export default Tweet;