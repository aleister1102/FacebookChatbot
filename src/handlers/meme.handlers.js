const axios = require('axios')

const callSendAPI = require('../utils/callSendAPI')

const User = require('../models/User')

const templates = { ...require('../templates/meme.templates') }

async function saveUser(sender_psid) {
    try {
        await User.create({ psid: sender_psid, remaining_memes: 5 })
    } catch (e) {
        console.log(e)
    }
}

async function decrementMemeCounter(sender_psid) {
    try {
        await User.updateOne(
            { psid: sender_psid },
            { $inc: { remaining_memes: -1 } },
        )
    } catch (e) {
        console.log(e)
    }
}

async function handleMemeRequest(sender_psid) {
    try {
        let result = await axios({
            method: 'GET',
            url: 'https://meme-api.herokuapp.com/gimme',
        })

        let user = await User.findOne({ psid: sender_psid })

        if (user) {
            if (user.remaining_memes > 0) {
                sendMeme(sender_psid, result.data.preview.pop())
                showMemeButtons(sender_psid)
                decrementMemeCounter(sender_psid)
            } else {
                denyMeme(sender_psid)
            }
        } else {
            saveUser(sender_psid)
        }
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

function denyMeme(sender_psid) {
    callSendAPI(sender_psid, {
        text: 'Rất tiếc, bạn đã hết số lần xem meme trong hôm nay rồi 😔',
    })
}

module.exports = { handleMemeRequest }
