const { handlers } = require('../handlers/')

const callSendAPI = require('../utils/callSendAPI')

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
            let sender_psid = webhook_event.sender?.id

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
    if (received_message.text) {
        handlers.handleSubjectResponse(sender_psid, received_message)
    } else if (received_message.attachments) {
        // Get the URL of the message attachment
        // let attachment_url = received_message.attachments[0].payload.url
        // response = templates.askTemplate(attachment_url)
    }
}

// Handles messaging_postbacks events
async function handlePostback(sender_psid, received_postback) {
    // Get the payload for the postback
    let payload = received_postback.payload

    // Set the response based on the postback payload
    switch (payload) {
        case 'GET_STARTED': {
            handlers.handleGetStarted(sender_psid)
            break
        }
        case 'MAIN_MENU': {
            handlers.showMainMenu(sender_psid)
            break
        }
        case 'EVENT': {
            handlers.showEventMenu(sender_psid)
            break
        }
        case 'MATERIAL': {
            handlers.showMaterialMenu(sender_psid)
            break
        }
        case 'MATERIAL_PHYSICS': {
            handlers.handleMaterialRequest(sender_psid, 'PHYSICS')
            break
        }
        case 'MATERIAL_MATH': {
            handlers.handleMaterialRequest(sender_psid, 'MATH')
            break
        }
        case 'MEME': {
            handlers.handleMemeRequest(sender_psid)
            break
        }
        default: {
            callSendAPI(sender_psid, {
                text: 'Rất tiếc, bot không thể xử lý yêu cầu này 😢',
            })
        }
    }
}

module.exports = {
    webhookController: {
        getWebhook,
        postWebhook,
    },
}
