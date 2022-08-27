const axios = require('axios')

const callSendAPI = require('../utils/callSendAPI')

const templates = { ...require('../templates/welcome.templates') }

async function handleGetStarted(sender_psid) {
    let user = await getUserInfo(sender_psid)

    sendGreeting(sender_psid, user)
    showMainMenu(sender_psid)
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

function showMainMenu(sender_psid) {
    let mainMenu = templates.WelcomeMenuTemplate()
    callSendAPI(sender_psid, mainMenu)
}

module.exports = { handleGetStarted, showMainMenu }
