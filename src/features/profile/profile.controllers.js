const axios = require('axios')

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
        get_started: { payload: 'GET_STARTED' },
        whitelisted_domains: [
            'https://1d41-2405-4803-c83e-86c0-9852-296d-6ebb-f885.ngrok.io/',
        ],
        persistent_menu: [
            {
                locale: 'default',
                composer_input_disabled: false,
                call_to_actions: [
                    {
                        type: 'postback',
                        title: 'Talk to an agent',
                        payload: 'CARE_HELP',
                    },
                    {
                        type: 'postback',
                        title: 'Outfit suggestions',
                        payload: 'CURATION',
                    },
                    {
                        type: 'web_url',
                        title: 'Shop now',
                        url: 'https://www.originalcoastclothing.com/',
                        webview_height_ratio: 'full',
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
