const { mainMenuTemplate } = require('./main.templates')
const { eventListTemplate } = require('./event.templates')
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

        materialMenuTemplate,
        subjectTemplate,
        materialTemplate,
        materialButtonsTemplate,

        memeTemplate,
        memeButtonsTemplate,
    },
}
