const callSendAPI = require('../utils/callSendAPI')

const { templates } = require('../templates/')

const eventImage =
    'https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

async function findCurrentEvents() {
    let events

    try {
        events = await Event.find({})
    } catch (e) {
        console.log(e)
    }

    return events
}

async function generateEventTemplate() {
    const events = await findCurrentEvents()

    return events.map((event) => ({
        title: `${event.name} ${event.semester}`,
        subtitle: `Năm học ${event.year}`,
        image_url: eventImage,
        buttons: [
            {
                type: 'postback',
                title: 'Xem thông tin',
                payload: `EVENT_${event._id.$oid}`,
            },
        ],
    }))
}

async function showEventMenu(sender_psid) {
    let eventList = await generateEventTemplate()
    let eventListTemplate = await templates.eventListTemplate(eventList)

    callSendAPI(sender_psid, eventListTemplate)
}

async function showEventDetails(sender_psid, event_id) {
    let event = await findEvent(event_id)
    let eventTemplate = templates.eventTemplate(event)

    callSendAPI(sender_psid, eventTemplate)
}

async function findEvent(event_id) {
    let event

    try {
        event = await Event.find({ _id: { $oid: event_id } })
        console.log('Found event based on payload!')
    } catch (e) {
        console.log(e)
    }

    return event
}

module.exports = { showEventMenu, showEventDetails }
