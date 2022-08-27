const axios = require('axios')

async function uploadMedia(url, type) {
    let result

    let request_body = {
        message: {
            attachment: {
                type,
                payload: {
                    is_reusable: true,
                    url,
                },
            },
        },
    }

    try {
        result = await axios({
            method: 'POST',
            url: `https://graph.facebook.com/v14.0/me/message_attachments?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
            data: request_body,
        })
        console.log('Upload image', ' - Succeed!')
    } catch (e) {
        console.log(e)
    }

    return result.data.attachment_id
}

module.exports = uploadMedia
