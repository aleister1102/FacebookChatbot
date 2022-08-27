const callSendAPI = require('../utils/callSendAPI')

const templates = { ...require('../templates/video.templates') }

const representationVideo = 'https://www.youtube.com/watch?v=nF_udLxmHAc'

function handleVideoRequest(sender_psid) {
    let video = templates.VideoTemplate(representationVideo)

    callSendAPI(sender_psid, video)
}

module.exports = { handleVideoRequest }
