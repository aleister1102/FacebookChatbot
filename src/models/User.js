const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        psid: { type: String, unique: true },
        memes: Number,
    },
    { _id: false, timestamps: true },
)

module.exports = mongoose.model('User', UserSchema)
