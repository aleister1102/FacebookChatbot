const axios = require('axios')

const callSendAPI = require('../utils/callSendAPI')

const User = require('../models/User')

const templates = { ...require('../templates/meme.templates') }

async function saveUser(sender_psid) {
    try {
        await User.create({ psid: sender_psid, memes: 5 })
    } catch (e) {
        console.log(JSON.stringify(e.response.data, null, 4))
    }
}

async function handleMemeRequest(sender_psid) {
    try {
        let result = await axios({
            method: 'GET',
            url: 'https://meme-api.herokuapp.com/gimme',
        })
        console.log('Get meme', ' - Succeed!')

        saveUser(sender_psid)
        sendMeme(sender_psid, result.data.preview.pop())
        showMemeButtons(sender_psid)
    } catch (e) {
        console.log(e)
    }
}

function sendMeme(sender_psid, meme_url) {
    let meme = templates.MemeTemplate(meme_url)
    callSendAPI(sender_psid, meme)
}

function showMemeButtons(sender_psid) {
    let memeButtons = templates.MemeButtonsTemplate()
    callSendAPI(sender_psid, memeButtons)
}

module.exports = { handleMemeRequest }
