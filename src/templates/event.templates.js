function eventMenuTemplate() {
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

module.exports = { eventMenuTemplate }
