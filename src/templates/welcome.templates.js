function WelcomeMenuTemplate() {
    return {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'generic',
                elements: [
                    {
                        title: `Bạn cần gì ở chúng tôi?`,
                        subtitle:
                            'Bấm vào một trong các nút bên dưới để trả lời',
                        image_url:
                            'https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                        buttons: [
                            {
                                type: 'postback',
                                title: 'Thông tin hoạt động',
                                payload: 'EVENT',
                            },
                            {
                                type: 'postback',
                                title: 'Xem meme',
                                payload: 'MEME',
                            },
                        ],
                    },
                ],
            },
        },
    }
}

module.exports = { MainMenuTemplate: WelcomeMenuTemplate }
