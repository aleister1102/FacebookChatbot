const { handleGetStarted, showMainMenu } = require('./get-started.handlers')
const { showEventMenu, showEventDetails } = require('./event.handlers')
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
        showEventMenu,
        showMaterialMenu,
        handleMaterialRequest,
        handleSubjectResponse,
        handleMemeRequest,
    },
}
