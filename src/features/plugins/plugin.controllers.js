const axios = require('axios')

function setupProfile(req, res) {
    // Construct the message body
    let request_body = {
        get_started: { payload: 'GET_STARTED' },
        whitelisted_domains: [
            'https://e19e-2405-4803-c83e-86c0-9852-296d-6ebb-f885.ngrok.io/',
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

module.exports = { setupProfile: setupProfile }
