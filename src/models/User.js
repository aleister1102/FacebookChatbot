const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        // private fields
        _id: Number,

        // public fields
        psid: { type: String, unique: true },
        memes: Number,
    },
    { _id: false },
)

UserSchema.plugin(AutoIncrement)

module.exports = mongoose.model('User', UserSchema)
