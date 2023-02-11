function MemeTemplate(meme_url) {
    return {
        attachment: {
            type: 'image',
            payload: {
                url: meme_url,
                is_reusable: true,
            },
        },
    }
}

function MemeButtonsTemplate() {
    return {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'generic',
                elements: [
                    {
                        title: 'Hi vọng chiếc meme này sẽ giúp bạn vui vẻ hơn 😊',
                        buttons: [
                            {
                                type: 'postback',
                                title: 'Xem meme khác',
                                payload: 'MEME',
                            },
                            {
                                type: 'postback',
                                title: 'Quay về menu chính',
                                payload: 'MAIN_MENU',
                            },
                        ],
                    },
                ],
            },
        },
    }
}

module.exports = { MemeTemplate, MemeButtonsTemplate }
