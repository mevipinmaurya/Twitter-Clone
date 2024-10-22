import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const tweetSchema = new Schema(
    {
        description: { type: String, required: true },
        image: { type: String },
        likes: { type: Array, default: [] },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        userDetails: { type: Array, default: [] }
    },
    {
        timestamps: true
    }
)

const Tweet = mongoose.model("Tweet", tweetSchema);
export default Tweet;