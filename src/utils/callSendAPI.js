const axios = require('axios')
const { setupTypingOn, setupMarkSeen } = require('../config/setup')

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        recipient: {
            id: sender_psid,
        },
        message: response,
    }

    // Before sending the message, set up typing on effect for upcoming messages and mark seen for received messages
    setupTypingOn(sender_psid)
    setupMarkSeen(sender_psid)

    // Send the HTTP request to the Messenger Platform
    axios({
        method: 'POST',
        url: `https://graph.facebook.com/v14.0/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
        data: request_body,
    })
        .then(() => console.log('Message sent!'))
        .catch((error) => console.log('Unable to send message: ' + error))
}

module.exports = callSendAPI
