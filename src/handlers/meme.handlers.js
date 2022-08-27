const axios = require('axios')

const callSendAPI = require('../utils/callSendAPI')
const hoursDiff = require('../utils/hoursDiff')

const User = require('../models/User')

const templates = { ...require('../templates/meme.templates') }

const MEME_LIMITATION = 5

async function updateTimeStamp(sender_psid) {
    try {
        await User.updateOne(
            { psid: sender_psid },
            { $set: { updatedAt: Date.now() } },
        )
    } catch (e) {
        console.log(e)
    }
}

async function decrementMemeCounter(sender_psid) {
    try {
        await User.updateOne(
            { psid: sender_psid },
            { $inc: { meme_counter: -1 } },
        )
    } catch (e) {
        console.log(e)
    }
}

async function resetMemeCounter(sender_psid) {
    try {
        await User.updateOne(
            { psid: sender_psid },
            { $set: { meme_counter: MEME_LIMITATION } },
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

        if (hoursDiff(user.updatedAt, Date.now()) >= 24) {
            resetMemeCounter(sender_psid)
            sendMeme(sender_psid, result.data.preview.pop())
            showMemeButtons(sender_psid)
        }

        if (user.meme_counter > 0) {
            sendMeme(sender_psid, result.data.preview.pop())
            showMemeButtons(sender_psid)
        } else {
            denyMeme(sender_psid)
        }
    } catch (e) {
        console.log(e)
    }
}

function sendMeme(sender_psid, meme_url) {
    let meme = templates.MemeTemplate(meme_url)
    callSendAPI(sender_psid, meme)

    decrementMemeCounter(sender_psid)
    updateTimeStamp(sender_psid)
}

function showMemeButtons(sender_psid) {
    let memeButtons = templates.MemeButtonsTemplate()
    callSendAPI(sender_psid, memeButtons)
}

function denyMeme(sender_psid) {
    callSendAPI(sender_psid, {
        text: 'Rất tiếc, bạn đã hết số lần xem meme trong hôm nay 😔',
    })
}

module.exports = { handleMemeRequest }
