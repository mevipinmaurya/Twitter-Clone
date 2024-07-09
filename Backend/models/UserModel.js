import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        followers: { type: Array, default: [] },
        following: { type: Array, default: [] },
        bookmarks: { type: Array, default: [] },
        bio : {type : String, default: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque molestias placeat aliquam error eum libero. Nesciunt officia pariatur ut! Assumenda."},
        profileImage : {type : String},
        coverImage : {type : String}
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema);
export default User;