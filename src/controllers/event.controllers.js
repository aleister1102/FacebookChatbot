const moment = require('moment')
const Event = require('../models/Event')

const convertDocumentsToObjects = require('../utils/convertDocumentsToObjects')

async function getEvents() {
    try {
        return await Event.find({})
    } catch (e) {
        console.log(e)
    }
}

async function getEventPage(req, res) {
    const events = await getEvents()

    res.render('event/event-list', {
        events: convertDocumentsToObjects(events),
    })
}

function getAddEventPage(req, res) {
    res.render('event/event-add', { year: new Date().getFullYear() })
}

async function addEvent(req, res) {
    const event = req.body

    try {
        await Event.create({
            ...event,
            datetime: formatDateTime(event.datetime, 'HH:mm DD-MM-YYYY'),
        })

        res.redirect('/event/list')
    } catch (e) {
        console.log(e)
    }
}

function formatDateTime(datetime, format) {
    return moment(datetime, 'YYYY-MM-DDTHH:mm').format(format)
}

module.exports = {
    eventController: {
        getEventPage,
        getAddEventPage,
        addEvent,
    },
}
