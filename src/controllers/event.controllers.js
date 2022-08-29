const Event = require('../models/Event')

const {
    convertMultipleDocumentsToObjects,
    convertDocumentToObject,
} = require('../utils/mongoose')
const { formatInputDateTime } = require('../utils/datetime')

async function getEvents() {
    try {
        return await Event.find({})
    } catch (e) {
        console.log(e)
    }
}

// [GET] /event/list
async function getEventPage(req, res) {
    const events = await getEvents()
    const cloneEvents = convertMultipleDocumentsToObjects(events)
    const formattedEvents = cloneEvents
        .map((event) => ({
            ...event,
            datetime: formatInputDateTime(event.datetime, 'DD-MM-YYYY HH:mm'),
        }))
        .sort((a, b) => a.order - b.order)

    res.render('event/event-list', { events: formattedEvents })
}

// [GET] /event/add
function getAddEventPage(req, res) {
    res.render('event/event-add', { year: new Date().getFullYear() })
}

// [POST] /event/list
async function addEvent(req, res) {
    const event = req.body

    try {
        await Event.create({ ...event, order: -1 })

        res.redirect('/event/list')
    } catch (e) {
        console.log(e)
    }
}

// [GET] /event/edit/:id
async function getEditEventPage(req, res) {
    try {
        const eventId = req.params.id
        const event = await Event.findById(eventId)
        const cloneEvent = convertDocumentToObject(event)

        res.render('event/event-edit', { event: cloneEvent })
    } catch (e) {
        console.log(e)
    }
}

// [PUT] /event/edit/:id
async function updateEvent(req, res) {
    const event = req.body

    try {
        await Event.findByIdAndUpdate(req.params.id, event)

        res.redirect('/event/list')
    } catch (e) {
        console.log(e)
    }
}

// [DELETE] /event/list/:id
async function deleteEvent(req, res) {
    try {
        await Event.findByIdAndDelete(req.params.id)

        res.redirect('/event/list')
    } catch (e) {
        console.log(e)
    }
}

// [PATCH] /event/arrange
async function arrangeEvents(req, res) {
    const eventOrder = req.body

    try {
        for (const eventId in eventOrder) {
            await Event.findByIdAndUpdate(eventId, {
                order: eventOrder[eventId],
            })
        }

        res.redirect('/event/list')
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    eventController: {
        getEventPage,
        getAddEventPage,
        addEvent,
        getEditEventPage,
        updateEvent,
        deleteEvent,
        arrangeEvents,
    },
}
