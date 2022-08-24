const request = require('request')
const axios = require('axios')

function askTemplate(attachment_url) {
    return {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'generic',
                elements: [
                    {
                        title: 'Is this the right picture?',
                        subtitle: 'Tap a button to answer.',
                        image_url: attachment_url,
                        buttons: [
                            {
                                type: 'postback',
                                title: 'Yes!',
                                payload: 'yes',
                            },
                            {
                                type: 'postback',
                                title: 'No!',
                                payload: 'no',
                            },
                        ],
                    },
                ],
            },
        },
    }
}

// Handles messages events
function handleMessage(sender_psid, received_message) {
    let response

    // Checks if the message contains text
    if (received_message.text) {
        // Create the payload for a basic text message, which
        // will be added to the body of our request to the Send API
        response = {
            text: `You sent the message: "${received_message.text}". Now send me an attachment!`,
        }
    } else if (received_message.attachments) {
        // Get the URL of the message attachment
        let attachment_url = received_message.attachments[0].payload.url
        response = askTemplate(attachment_url)
    }

    // Send the response message
    callSendAPI(sender_psid, response)
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
    let response

    // Get the payload for the postback
    let payload = received_postback.payload

    // Set the response based on the postback payload
    if (payload === 'yes') {
        response = { text: 'Thanks!' }
    } else if (payload === 'no') {
        response = { text: 'Oops, try sending another image.' }
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response)
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        recipient: {
            id: sender_psid,
        },
        message: response,
    }

    // Send the HTTP request to the Messenger Platform
    axios({
        method: 'POST',
        url: `https://graph.facebook.com/v2.6/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
        data: request_body,
    })
        .then(() => console.log('message sent!'))
        .catch((error) => console.log('Unable to send message:' + error))
}

module.exports = {
    handleMessage: handleMessage,
    handlePostback: handlePostback,
    callSendAPI: callSendAPI,
}
