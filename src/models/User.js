const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        psid: { type: String, unique: true },
        meme_counter: Number,
    },
    { timestamps: true },
)

module.exports = mongoose.model('User', UserSchema, 'users')
