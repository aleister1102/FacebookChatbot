const callSendAPI = require('../utils/callSendAPI')

const templates = { ...require('../templates/video.templates') }

// smaller than 25MB
const representationVideo =
    'https://www.youtube.com/watch?v=jNQXAC9IVRw'

function handleVideoRequest(sender_psid) {
    let video = templates.VideoTemplate(representationVideo)

    callSendAPI(sender_psid, video)
}

module.exports = { handleVideoRequest }
