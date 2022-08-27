const eventImage =
    'https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

async function eventListTemplate(eventList) {
    return {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'generic',
                elements: [
                    ...eventList,
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

function eventTemplate(event) {
    return {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'generic',
                elements: [
                    {
                        title: `${event.name}`,
                        subtitle: `Thời gian: ${event.time}\n
                        Địa điểm: ${event.location}
                        `,
                    },
                ],
            },
        },
    }
}

module.exports = {
    eventListTemplate,
    eventTemplate,
}
