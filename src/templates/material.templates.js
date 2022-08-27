function materialMenuTemplate() {
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
                                title: 'Tìm kiếm',
                                payload: `MATERIAL_PHYSICS`,
                            },
                        ],
                    },
                    {
                        title: `Toán học`,
                        image_url: `https://images.pexels.com/photos/374918/pexels-photo-374918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
                        buttons: [
                            {
                                type: 'postback',
                                title: 'Tìm kiếm',
                                payload: `MATERIAL_MATH`,
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

function subjectTemplate(subjects) {
    return {
        text: 'Đây là các môn học mà bot đã tìm thấy 🤗: ',
        quick_replies: subjects.map((subject) => ({
            content_type: 'text',
            title: subject.name,
            payload: subject.payload,
        })),
    }
}

function materialTemplate(subject) {
    return { text: `Đây là các tài liệu về ${subject} mà bạn cần: ` }
}

function materialButtonsTemplate() {
    return {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'generic',
                elements: [
                    {
                        title: 'Hi vọng các tài liệu trên sẽ giúp bạn học tập tốt hơn 😄',
                        buttons: [
                            {
                                type: 'postback',
                                title: 'Tìm tài liệu khác',
                                payload: 'MATERIAL',
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
    materialMenuTemplate,
    subjectTemplate,
    materialTemplate,
    materialButtonsTemplate,
}
