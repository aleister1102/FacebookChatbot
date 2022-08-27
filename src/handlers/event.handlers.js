const callSendAPI = require('../utils/callSendAPI')

const { templates } = require('../templates/')

const Event = require('../models/Event')

const eventImage =
    'https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

async function showEventList(sender_psid) {
    try {
        const events = await Event.find({})

        const eventListTemplate = generateEventListTemplate(events)
        callSendAPI(sender_psid, eventListTemplate)
    } catch (e) {
        console.log(e)
    }
}

function generateEventListTemplate(events) {
    const eventsList = events.map((event) => ({
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

    return templates.eventListTemplate(eventsList)
}

async function showEventDetails(sender_psid, event_id) {
    try {
        const event = await Event.findById(event_id)

        const eventTemplate = templates.eventTemplate(event)
        console.log(JSON.stringify(eventTemplate, null, 4))
        callSendAPI(sender_psid, eventTemplate)
    } catch (e) {
        console.log(e)
    }

    return event
}

module.exports = {
    showEventList,
    showEventDetails,
}
