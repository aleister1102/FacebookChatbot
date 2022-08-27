const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    psid: { type: String, unique: true },
    meme_counter: Number,
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('User', UserSchema, 'users')
