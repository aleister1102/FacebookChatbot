const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    psid: { type: String, unique: true },
    meme_counter: Number,
    createdAt: { type: String, default: Date.now() },
    updatedAt: { type: String, default: Date.now() },
})

module.exports = mongoose.model('User', UserSchema, 'users')
