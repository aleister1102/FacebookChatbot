const { handleGetStarted, showMainMenu } = require('./get-started.handlers')
const { showEventList, showEventDetails } = require('./event.handlers')
const {
    showMaterialMenu,
    handleMaterialRequest,
    handleSubjectResponse,
} = require('./material.handlers')
const { handleMemeRequest } = require('./meme.handlers')

module.exports = {
    handlers: {
        handleGetStarted,
        showMainMenu,
        showEventList,
        showEventDetails,
        showMaterialMenu,
        handleMaterialRequest,
        handleSubjectResponse,
        handleMemeRequest,
    },
}
