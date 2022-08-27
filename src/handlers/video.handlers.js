const callSendAPI = require('../utils/callSendAPI')

const templates = { ...require('../templates/video.templates') }

const representationVideo =
    'https://drive.google.com/file/d/1DGbMPI-i9hNfB951WgTJnBGyDfwPcqJo/view'

function handleVideoRequest(sender_psid) {
    let video = templates.VideoTemplate(representationVideo)

    callSendAPI(sender_psid, video)
}

module.exports = { handleVideoRequest }
