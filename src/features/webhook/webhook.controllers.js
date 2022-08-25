const axios = require('axios')
const { memeTemplate } = require('./webhook.templates')

function getWebhook(req, res) {
    // Parse the query params
    let mode = req.query['hub.mode']
    let token = req.query['hub.verify_token']
    let challenge = req.query['hub.challenge']

    // Check if a token and mode is in the query string of the request
    if (mode && token) {
        // Check the mode and token sent is correct
        if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
            // Respond with the challenge token from the request
            console.log('WEBHOOK_VERIFIED') 
            res.status(200).send(challenge)
        } else {
            // Respond with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403)
        }
    }
}

function postWebhook(req, res) {
    // Parse the request body from the POST
    let body = req.body

    // Check the webhook event is from a Page subscription
    if (body.object === 'page') {
        // Iterate over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {
            // Gets the body of the webhook event
            let webhook_event = entry.messaging[0]
            console.log(webhook_event)

            // Get the sender PSID
            let sender_psid = webhook_event.sender.id

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message)
            } else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback)
            }
        })

        // Return a '200 OK' response to all events
        res.status(200).send('EVENT_RECEIVED')
    } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404)
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
            text: `You sent the message: "${received_message.text}"`,
        }
    }
    // TODO: handle attachments
    else if (received_message.attachments) {
        // Get the URL of the message attachment
        // let attachment_url = received_message.attachments[0].payload.url
        // response = templates.askTemplate(attachment_url)
    }

    // Send the response message
    callSendAPI(sender_psid, response)
}

const templates = require('./webhook.templates')

// Handles messaging_postbacks events
async function handlePostback(sender_psid, received_postback) {
    let response

    // Get the payload for the postback
    let payload = received_postback.payload

    // Set the response based on the postback payload
    if (payload === 'GET_STARTED' || payload === 'RESTART') {
        response = await generateWelcomeTemplate(sender_psid)
    } else if (payload === 'REQUEST_EVENT') {
        response = templates.eventTemplate()
    } else if (payload === 'REQUEST_MATERIAL') {
        response = templates.materialTemplate()
    } else if (payload === 'REQUEST_MEME') {
        response = await generateMemeTemplate()
    }

    callSendAPI(sender_psid, response)
    // Send the message to acknowledge the postback
}

async function generateWelcomeTemplate(sender_psid) {
    let user = await getUserInfo(sender_psid)
    return templates.welcomeTemplate(user)
}

async function getUserInfo(sender_psid) {
    let result

    try {
        result = await axios({
            method: 'GET',
            url: `https://graph.facebook.com/${sender_psid}?&access_token=${process.env.PAGE_ACCESS_TOKEN}`,
        })
    } catch (e) {
        console.log(e)
    }

    return result.data
}

async function generateMemeTemplate() {
    let meme_url = await getMeme()
    let attachment_id = await uploadImage(meme_url)
    return templates.memeTemplate(attachment_id)
}

async function getMeme() {
    let result

    try {
        result = await axios({
            method: 'GET',
            url: 'https://meme-api.herokuapp.com/gimme',
        })
    } catch (e) {
        console.log(e)
    }

    return result.data.preview.pop()
}

async function uploadImage(url) {
    let result

    let request_body = {
        message: {
            attachment: {
                type: 'image',
                payload: {
                    is_reusable: true,
                    url,
                },
            },
        },
    }
    try {
        result = await axios({
            method: 'POST',
            url: `https://graph.facebook.com/v14.0/me/message_attachments?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
            data: request_body,
        })
    } catch (e) {
        console.log(e)
    }

    return result.data.attachment_id
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
        url: `https://graph.facebook.com/v14.0/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
        data: request_body,
    })
        .then(() => console.log('Message sent!'))
        .catch((error) => console.log('Unable to send message: ' + error))
}

module.exports = { getWebhook: getWebhook, postWebhook: postWebhook }
