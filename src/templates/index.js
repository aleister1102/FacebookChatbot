const { mainMenuTemplate } = require('./main.templates')
const { eventListTemplate, eventDetailsTemplate } = require('./event.templates')
const {
    materialMenuTemplate,
    subjectTemplate,
    materialTemplate,
    materialButtonsTemplate,
} = require('./material.templates')
const { memeTemplate, memeButtonsTemplate } = require('./meme.templates')

module.exports = {
    templates: {
        mainMenuTemplate,

        eventListTemplate,
        eventDetailsTemplate,

        materialMenuTemplate,
        subjectTemplate,
        materialTemplate,
        materialButtonsTemplate,

        memeTemplate,
        memeButtonsTemplate,
    },
}
