const axios = require('axios')

function welcomeTemplate(user) {
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
                                title: 'Tìm tài liệu',
                                payload: 'MATERIAL',
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

function eventTemplate() {
    return {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'generic',
                // get from database
                elements: [
                    {
                        title: `Ôn thi giữa kỳ 1`,
                        subtitle: `Năm học 2022-2023`,
                        image_url: `https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
                        buttons: [
                            {
                                type: 'postback',
                                title: 'Xem thông tin',
                                payload: `EVENT_2`,
                            },
                        ],
                    },
                    {
                        title: `Ôn thi cuối kỳ 1`,
                        subtitle: `Năm học 2022-2023`,
                        image_url: `https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
                        buttons: [
                            {
                                type: 'postback',
                                title: 'Xem thông tin',
                                payload: `EVENT_2`,
                            },
                        ],
                    },
                    {
                        title: `Ôn thi giữa kỳ 2`,
                        subtitle: `Năm học 2022-2023`,
                        image_url: `https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
                        buttons: [
                            {
                                type: 'postback',
                                title: 'Xem thông tin',
                                payload: `EVENT_3`,
                            },
                        ],
                    },
                    {
                        title: `Ôn thi cuối kỳ 2`,
                        subtitle: `Năm học 2022-2023`,
                        image_url: `https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
                        buttons: [
                            {
                                type: 'postback',
                                title: 'Xem thông tin',
                                payload: `EVENT_4`,
                            },
                        ],
                    },
                    {
                        title: `Trở về`,
                        image_url: `https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
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

function materialTemplate() {
    return {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'generic',
                elements: [
                    {
                        title: `Vật Lý`,
                        image_url: `https://images.pexels.com/photos/714699/pexels-photo-714699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
                        buttons: [
                            {
                                type: 'postback',
                                title: 'Xem tài liệu',
                                payload: `MATERIAL_1`,
                            },
                        ],
                    },
                    {
                        title: `Toán học`,
                        image_url: `https://images.pexels.com/photos/374918/pexels-photo-374918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
                        buttons: [
                            {
                                type: 'postback',
                                title: 'Xem tài liệu',
                                payload: `MATERIAL_2`,
                            },
                        ],
                    },
                    {
                        title: `Trở về`,
                        image_url: `https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
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

function memeTemplate(meme_url) {
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

function memeButtonsTemplate(attachment_id) {
    return {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'generic',
                elements: [
                    {
                        title: 'Hi vọng chiếc meme ở trên sẽ giúp bạn vui vẻ hơn 😊',
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

module.exports = {
    welcomeTemplate: welcomeTemplate,
    eventTemplate: eventTemplate,
    materialTemplate: materialTemplate,
    memeButtonsTemplate: memeButtonsTemplate,
    memeTemplate: memeTemplate,
}
