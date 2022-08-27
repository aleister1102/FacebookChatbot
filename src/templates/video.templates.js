function VideoTemplate(video_url) {
    return {
        attachment: {
            type: 'video',
            payload: {
                url: video_url,
                is_reusable: true,
            },
        },
    }
}

module.exports = { VideoTemplate }
