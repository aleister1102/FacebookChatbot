const { mainMenuTemplate } = require('./main.templates')
const { eventMenuTemplate } = require('./event.templates')
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

        eventMenuTemplate,

        materialMenuTemplate,
        subjectTemplate,
        materialTemplate,
        materialButtonsTemplate,

        memeTemplate,
        memeButtonsTemplate,
    },
}
