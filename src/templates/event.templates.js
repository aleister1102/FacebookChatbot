const Event = require('../models/Event')

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
                payload: `EVENT_${event.id}`,
            },
        ],
    }))
}

async function eventMenuTemplate() {
    return {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'generic',
                elements: [
                    ...(await generateEventTemplate()),
                    {
                        title: `Trở về`,
                        image_url: eventImage,
                        buttons: [
                            {
                                type: 'postback',
                                title: 'Quay về menu chính',
                                payload: `MAIN_MENU`,
                            },
                        ],
                    },
                ],
            },
        },
    }
}

module.exports = { eventMenuTemplate }
