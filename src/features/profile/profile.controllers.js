const axios = require('axios')

const FANPAGE_URL =
    'https://www.facebook.com/Aleisters-botchat-103450915827944/'
const MATERIAL_URL = 'https://www.wikipedia.org/'
const APP_DOMAIN = 'https://aleister-botchat.herokuapp.com/'

function setupProfile(req, res) {
    // Construct the message body
    let request_body = {
        greeting: [
            {
                locale: 'default',
                text: 'Hello!',
            },
            {
                locale: 'en_US',
                text: 'Timeless apparel for the masses.',
            },
        ],
        get_started: {
            payload: 'GET_STARTED',
        },
        whitelisted_domains: [APP_DOMAIN],
        persistent_menu: [
            {
                locale: 'default',
                composer_input_disabled: false,
                call_to_actions: [
                    {
                        type: 'web_url',
                        title: 'Truy cập fanpage',
                        url: FANPAGE_URL,
                    },
                    {
                        type: 'web_url',
                        title: 'Tài liệu tổng hợp',
                        url: MATERIAL_URL,
                    },
                    {
                        type: 'postback',
                        title: 'Menu chính',
                        payload: 'MAIN_MENU',
                    },
                ],
            },
        ],
    }

    // Send the HTTP request to the Messenger Platform
    axios({
        method: 'POST',
        url: `https://graph.facebook.com/v14.0/me/messenger_profile?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
        data: request_body,
    })
        .then(() => {
            console.log('Setup successfully!')
            res.redirect('/')
        })
        .catch((error) => console.log('Unable to setup: ' + error))
}

module.exports = {
    setupProfile: setupProfile,
}
