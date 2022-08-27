const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema

const EventSchema = new Schema(
    {
        // private fields
        _id: Number,

        // public fields
        name: String,
        semester: String,
        year: String,

        // details
        time: Date,
        location: String,
    },
    { _id: false },
)

EventSchema.plugin(AutoIncrement)

module.exports = mongoose.model('Event', EventSchema)
