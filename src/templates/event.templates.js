function EventListTemplate(eventList) {
    return {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'generic',
                elements: [
                    ...eventList,
                    {
                        title: `Trở về`,
                        image_url:
                            'https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                        buttons: [
                            {
                                type: 'postback',
                                title: 'Menu chính',
                                payload: `MAIN_MENU`,
                            },
                        ],
                    },
                ],
            },
        },
    }
}

function EventDetailsTemplate(event) {
    return {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'generic',
                elements: [
                    {
                        title: `${event.name}`,
                        subtitle: `Thời gian: ${event.datetime || ''}\nĐịa điểm: ${
                            event.location
                        }`,
                    },
                ],
            },
        },
    }
}

module.exports = { EventListTemplate, EventDetailsTemplate }
