const callSendAPI = require('../utils/callSendAPI')

const { templates } = require('../templates/')

function showEventMenu(sender_psid) {
    let eventMenu = templates.eventMenuTemplate()
    callSendAPI(sender_psid, eventMenu)
}

module.exports = { showEventMenu }
