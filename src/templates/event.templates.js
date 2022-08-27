const eventImage =
    'https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
const studyImage =
    'https://images.pexels.com/photos/4778611/pexels-photo-4778611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

function eventListTemplate(eventList) {
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

module.exports = { eventListTemplate }
