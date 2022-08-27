const callSendAPI = require('../utils/callSendAPI')

const templates = { ...require('../templates/video.templates') }

// smaller than 25MB
const representationVideo =
    'https://www.youtube.com/watch?v=I10XB1-IIbA'

function handleVideoRequest(sender_psid) {
    let video = templates.VideoTemplate(representationVideo)

    callSendAPI(sender_psid, video)
}

module.exports = { handleVideoRequest }
