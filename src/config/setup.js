const axios = require('axios')

const APP_DOMAIN = 'https://aleister-botchat.herokuapp.com/'
const FANPAGE_URL =
    'https://www.facebook.com/Aleisters-botchat-103450915827944/'
const MATERIAL_URL = 'https://www.wikipedia.org/'

function setupProfile() {
    // Construct the message body
    let request_body = {
        greeting: [
            {
                locale: 'default',
                text: 'Xin chào!',
            },
            {
                locale: 'en_US',
                text: 'Welcome',
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
                // add about page
                call_to_actions: [
                    {
                        type: 'postback',
                        title: 'Menu chính',
                        payload: 'MAIN_MENU',
                    },
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
        })
        .catch((error) => console.log('Unable to setup: ' + error))
}

function setupTypingOn(sender_psid) {
    let request_body = {
        recipient: {
            id: sender_psid,
        },
        sender_action: 'typing_on',
    }

    axios({
        method: 'POST',
        url: `https://graph.facebook.com/v14.0/${process.env.PAGE_ID}/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
        data: request_body,
    })
        .then(() => console.log('Set up typing on', ' - Succeed!'))
        .catch((error) => console.log('Set up typing on', '- Failed: ' + error))
}

function setupMarkSeen(sender_psid) {
    let request_body = {
        recipient: {
            id: sender_psid,
        },
        sender_action: 'mark_seen',
    }

    axios({
        method: 'POST',
        url: `https://graph.facebook.com/v14.0/${process.env.PAGE_ID}/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
        data: request_body,
    })
        .then(() => console.log('Set up mark seen', ' - Succeed!'))
        .catch((error) => console.log('Set up mark seen', '- Failed: ' + error))
}

module.exports = { setupProfile, setupTypingOn, setupMarkSeen }
