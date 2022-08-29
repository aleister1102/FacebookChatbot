const callSendAPI = require('../utils/callSendAPI')
const { formatInputDateTime } = require('../utils/datetime')

const Event = require('../models/Event')

const templates = { ...require('../templates/event.templates') }

const eventImage =
    'https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

async function showEventList(sender_psid) {
    try {
        const events = await Event.find({})

        const eventList = generateEventListTemplate(events)
        callSendAPI(sender_psid, eventList)
    } catch (e) {
        console.log(e)
    }
}

function generateEventListTemplate(events) {
    const eventsList = events
        .sort((a, b) => a.order - b.order)
        .map((event) => ({
            title: `${event.name}`,
            image_url: eventImage,
            buttons: [
                {
                    type: 'postback',
                    title: 'Xem thông tin',
                    payload: `EVENT_${event._id}`,
                },
            ],
        }))

    return templates.EventListTemplate(eventsList)
}

async function showEventDetails(sender_psid, event_id) {
    try {
        const event = await Event.findById(event_id)
        event.datetime = formatInputDateTime(event.datetime, 'DD-MM-YYYY HH:mm')

        const eventDetails = templates.EventDetailsTemplate(event)
        callSendAPI(sender_psid, eventDetails)
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    showEventList,
    showEventDetails,
}
