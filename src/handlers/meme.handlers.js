const axios = require('axios')

const callSendAPI = require('../utils/callSendAPI')

const { templates } = require('../templates/')

async function handleMemeRequest(sender_psid) {
    try {
        let result = await axios({
            method: 'GET',
            url: 'https://meme-api.herokuapp.com/gimme',
        })
        console.log('Get meme', ' - Succeed!')

        sendMeme(sender_psid, result.data.preview.pop())
        showMemeButtons(sender_psid)
    } catch (e) {
        console.log(e)
    }
}

function sendMeme(sender_psid, meme_url) {
    let meme = templates.memeTemplate(meme_url)
    callSendAPI(sender_psid, meme)
}

function showMemeButtons(sender_psid) {
    let memeButtons = templates.memeButtonsTemplate()
    callSendAPI(sender_psid, memeButtons)
}

module.exports = { handleMemeRequest }
