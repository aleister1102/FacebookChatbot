const axios = require('axios')
const {
    toLowerCaseNonAccentVietnamese,
} = require('../../utils/nonAccentVietnamese')

let isRequestingMaterial = false
let materialSubject = ''

const physicsSubjects = [
    { name: 'Vật lý đại cương 1', payload: 'PHYSICS_1' },
    { name: 'Vật lý đại cương 2', payload: 'PHYSICS_2' },
    { name: 'Vật lý đại cương 3', payload: 'PHYSICS_3' },
    { name: 'Vật lý hại điện', payload: 'PHYSICS_MORDEN' },
    { name: 'Trường điện từ', payload: 'PHYSICS_EM_FIELD' },
    { name: 'Cơ học lượng tử', payload: 'PHYSICS_QUANTUM' },
]

const mathSubjects = [
    { name: 'Vi tích phân 1B', payload: 'MATH_1B' },
    { name: 'Vi tích phân 2B', payload: 'MATH_2B' },
    { name: 'Đại số tuyến tính', payload: 'MATH_LA' },
    { name: 'Xác chết thống kê', payload: 'MATH_PROB_STAT' },
]

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
        if (isRequestingMaterial) {
            showMaterialName(sender_psid, received_message.text)
        }
        // Create the payload for a basic text message, which
        // will be added to the body of our request to the Send API
        response = {
            text: `Chào mừng bạn đến với Aleister's chatbot! Bọn mình sẽ trả lời lại cho bạn sớm nhất có thể!`,
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
    switch (payload) {
        case 'GET_STARTED': {
            handleGetStarted(sender_psid)
            break
        }
        case 'MAIN_MENU': {
            sendMainMenu(sender_psid)
            break
        }
        case 'EVENT': {
            showEventMenu(sender_psid)
            break
        }
        case 'MATERIAL': {
            showMaterialMenu(sender_psid)
            break
        }
        case 'MATERIAL_PHYSICS': {
            handleMaterialRequest(sender_psid, 'PHYSICS')
            break
        }
        case 'MATERIAL_MATH': {
            handleMaterialRequest(sender_psid, 'MATH')
            break
        }
        case 'MEME': {
            handleMemeRequest(sender_psid)
            break
        }
        default: {
            callSendAPI(sender_psid, {
                text: 'Rất tiếc, bot không thể xử lý yêu cầu này 😢',
            })
        }
    }
}

async function handleGetStarted(sender_psid) {
    let user = await getUserInfo(sender_psid)

    sendGreeting(sender_psid, user)
    sendMainMenu(sender_psid)
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

function sendGreeting(sender_psid, user) {
    let greeting = {
        text: `Chào mừng ${user.first_name} ${user.last_name} đến với Aleister's chatbot!`,
    }
    callSendAPI(sender_psid, greeting)
}

function sendMainMenu(sender_psid) {
    let mainMenu = templates.mainMenuTemplate()
    callSendAPI(sender_psid, mainMenu)
}

function showEventMenu(sender_psid) {
    let eventMenu = templates.eventTemplate()
    callSendAPI(sender_psid, eventMenu)
}

function showMaterialMenu(sender_psid) {
    let materialMenu = templates.materialTemplate()
    callSendAPI(sender_psid, materialMenu)
}

function handleMaterialRequest(sender_psid, subject) {
    askForMaterialName(sender_psid)
    isRequestingMaterial = true
    materialSubject = subject
}

function askForMaterialName(sender_psid) {
    let askQuestion = {
        text: 'Bạn có thể cho mình biết tên môn học mà bạn muốn tìm được không 😉?',
    }
    callSendAPI(sender_psid, askQuestion)
}

function matchMaterial(subject, receivedName) {
    console.log("🌸 ~ file: webhook.controllers.js ~ line 208 ~ matchMaterial ~ requestedName", typeof receivedName);
    subject = toLowerCaseNonAccentVietnamese(subject)
    receivedName = toLowerCaseNonAccentVietnamese(receivedName)

    return receivedName.split(' ').find((word) => subject.includes(word))
}

function searchMaterial(subjects, receivedName) {
    return subjects.filter((suject) => matchMaterial(suject, receivedName))
}

function showMaterialName(sender_psid, receivedName) {
    let foundMaterials

    if (materialSubject === 'PHYSICS') {
        foundMaterials = searchMaterial(physicsSubjects, receivedName)
    } else if (materialSubject === 'MATH') {
        foundMaterials = searchMaterial(mathSubjects, receivedName)
    }

    let response = templates.subjectTemplate(foundMaterials)
    callSendAPI(sender_psid, response)
    isRequestingMaterial = false
}

async function handleMemeRequest(sender_psid) {
    try {
        let result = await axios({
            method: 'GET',
            url: 'https://meme-api.herokuapp.com/gimme',
        })
        console.log('Get meme', ' - Succeed!')

        await Promise.resolve((resolve, reject) => {
            sendMeme(sender_psid, result.data.preview.pop())
        })

        sendMemeButtons(sender_psid)
    } catch (e) {
        console.log(e)
    }
}

function sendMeme(sender_psid, meme_url) {
    let meme = templates.memeTemplate(meme_url)
    callSendAPI(sender_psid, meme)
}

function sendMemeButtons(sender_psid) {
    let memeButtons = templates.memeButtonsTemplate()
    callSendAPI(sender_psid, memeButtons)
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
        console.log('Upload image', ' - Succeed!')
    } catch (e) {
        console.log(e)
    }

    return result.data.attachment_id
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
    // setupMarkSeen(sender_psid)

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
