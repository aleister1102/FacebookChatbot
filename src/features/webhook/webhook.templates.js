function askTemplate(attachment_url) {
    return {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'generic',
                elements: [
                    {
                        title: 'Is this the right picture?',
                        subtitle: 'Tap a button to answer.',
                        image_url: attachment_url,
                        buttons: [
                            {
                                type: 'postback',
                                title: 'Yes!',
                                payload: 'yes',
                            },
                            {
                                type: 'postback',
                                title: 'No!',
                                payload: 'no',
                            },
                        ],
                    },
                ],
            },
        },
    }
}

function welcomeTemplate() {
    return {}
}

module.exports = { askTemplate: askTemplate, welcomeTemplate: welcomeTemplate }
