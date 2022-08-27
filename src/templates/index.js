const { mainMenuTemplate } = require('./main.templates')
const { eventListTemplate, eventTemplate } = require('./event.templates')
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
        eventTemplate,

        materialMenuTemplate,
        subjectTemplate,
        materialTemplate,
        materialButtonsTemplate,

        memeTemplate,
        memeButtonsTemplate,
    },
}
