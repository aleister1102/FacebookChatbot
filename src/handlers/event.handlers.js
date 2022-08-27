const callSendAPI = require('../utils/callSendAPI')

const { templates } = require('../templates/')

async function showEventMenu(sender_psid) {
    let eventMenu = await templates.eventMenuTemplate()
    callSendAPI(sender_psid, eventMenu)
}

module.exports = { showEventMenu }
