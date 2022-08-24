const axios = require('axios')

function welcomeTemplate(user) {
    return {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'generic',
                elements: [
                    {
                        title: `Xin chào ${user.first_name} ${user.last_name}`,
                        subtitle: 'Bạn cần gì ở chúng tôi?',
                        image_url:
                            'https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                        buttons: [
                            {
                                type: 'postback',
                                title: 'Thông tin hoạt động',
                                payload: 'REQUEST_EVENT',
                            },
                            {
                                type: 'postback',
                                title: 'Tìm tài liệu',
                                payload: 'REQUEST_MATERIAL',
                            },
                            {
                                type: 'postback',
                                title: 'Xem meme',
                                payload: 'REQUEST_MEME',
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
                                payload: `REQUEST_EVENT_2`,
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
                                payload: `REQUEST_EVENT_2`,
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
                                payload: `REQUEST_EVENT_3`,
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
                                payload: `REQUEST_EVENT_4`,
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
                                payload: `REQUEST_MATERIAL_1`,
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
                                payload: `REQUEST_MATERIAL_2`,
                            },
                        ],
                    },
                ],
            },
        },
    }
}

function memeTemplate(attachment_id) {
    return {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'media',
                elements: [
                    {
                        media_type: 'image',
                        attachment_id,
                        buttons: [
                            {
                                type: 'postback',
                                title: 'Xem meme khác',
                                payload: 'REQUEST_OTHER_MEME',
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
    memeTemplate: memeTemplate,
}
