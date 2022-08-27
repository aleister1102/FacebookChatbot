const callSendAPI = require('../utils/callSendAPI')

const { templates } = require('../templates/')

const Event = require('../models/Event')

const eventImage =
    'https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

async function showEventList(sender_psid) {
    let events

    try {
        events = await Event.find({})
        console.log('Event list: ', JSON.stringify(events))

        let eventListTemplate = generateEventListTemplate(events)
        callSendAPI(sender_psid, eventListTemplate)
    } catch (e) {
        console.log(e)
    }

    return events
}

function generateEventListTemplate(events) {
    return events.map((event) => ({
        title: `${event.name} ${event.semester}`,
        subtitle: `Năm học ${event.year}`,
        image_url: eventImage,
        buttons: [
            {
                type: 'postback',
                title: 'Xem thông tin',
                payload: `EVENT_${event._id}`,
            },
        ],
    }))
}

async function showEventDetails(sender_psid, event_id) {
    let event

    try {
        event = await Event.find({ _id: event_id })
        console.log('Found event based on payload: ', event)

        let eventTemplate = templates.eventTemplate(event)
        callSendAPI(sender_psid, eventTemplate)
    } catch (e) {
        console.log(e)
    }

    return event
}

module.exports = {
    showEventList: showEventList,
    showEventDetails: showEventDetails,
}
