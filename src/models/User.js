const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        psid: { type: String, unique: true },
        remaining_memes: Number,
    },
    { timestamps: true },
)

module.exports = mongoose.model('User', UserSchema, 'users')
