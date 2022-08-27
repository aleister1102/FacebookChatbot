const Event = require('../models/Event')

async function findCurrentEvents() {
    let events

    try {
        events = await Event.find({})
    } catch (e) {
        console.log(e)
    }

    return events
}

module.exports = findCurrentEvents
