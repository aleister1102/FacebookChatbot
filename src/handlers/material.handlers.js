const callSendAPI = require('../utils/callSendAPI')

const {
    toLowerCaseNonAccentVietnamese,
} = require('../utils/nonAccentVietnamese')

const templates = { ...require('../templates/material.templates') }

let isRequestingMaterial = false
let requestingSubject = ''

const physicsSubjects = [
    { name: 'Vật lý đại cương 1', payload: 'PHYSICS_1' },
    { name: 'Vật lý đại cương 2', payload: 'PHYSICS_2' },
    { name: 'Vật lý đại cương 3', payload: 'PHYSICS_3' },
    { name: 'Vật lý hại điện', payload: 'PHYSICS_MODERN' },
    { name: 'Trường điện từ', payload: 'PHYSICS_EM_FIELD' },
    { name: 'Cơ học lượng tử', payload: 'PHYSICS_QUANTUM' },
]

const mathSubjects = [
    { name: 'Vi tích phân 1B', payload: 'MATH_1B' },
    { name: 'Vi tích phân 2B', payload: 'MATH_2B' },
    { name: 'Đại số tuyến tính', payload: 'MATH_LA' },
    { name: 'Xác chết thống kê', payload: 'MATH_PROB_STAT' },
]

function showMaterialMenu(sender_psid) {
    let materialMenu = templates.MaterialMenuTemplate()
    callSendAPI(sender_psid, materialMenu)
}

function handleMaterialRequest(sender_psid, subject) {
    askForSubject(sender_psid)
    isRequestingMaterial = true
    requestingSubject = subject
}

function askForSubject(sender_psid) {
    let askQuestion = {
        text: 'Nhập tên môn học để bot tìm tài liệu cho nè 😉?',
    }
    callSendAPI(sender_psid, askQuestion)
}

function handleSubjectResponse(sender_psid, received_message) {
    if (isRequestingMaterial) {
        showSubjects(sender_psid, received_message.text)
    } else if (received_message.quick_reply) {
        let payload = received_message.quick_reply.payload

        if (
            physicsSubjects.find((subject) => subject.payload === payload) ||
            mathSubjects.find((subject) => subject.payload === payload)
        ) {
            sendMaterial(sender_psid, received_message.text)
            showMaterialButtons(sender_psid)
        }
    }
}

function showSubjects(sender_psid, receivedName) {
    let foundSubjects
    let response

    if (requestingSubject === 'PHYSICS') {
        foundSubjects = searchSubject(physicsSubjects, receivedName)
    } else if (requestingSubject === 'MATH') {
        foundSubjects = searchSubject(mathSubjects, receivedName)
    }

    if (foundSubjects) {
        response = templates.SubjectTemplate(foundSubjects)
    } else {
        response = { text: 'Rất tiếc, bot không tìm thấy môn học đó 😔' }
    }

    callSendAPI(sender_psid, response)
    isRequestingMaterial = false
}

function searchSubject(subjects, receivedName) {
    return subjects.filter((suject) => matchSubject(suject.name, receivedName))
}

function matchSubject(subject, receivedName) {
    subject = toLowerCaseNonAccentVietnamese(subject)
    receivedName = toLowerCaseNonAccentVietnamese(receivedName)

    // equal compare instead of includes
    return receivedName.split(' ').find((word) => subject.includes(word))
}

function sendMaterial(sender_psid, subject) {
    let response = templates.MaterialTemplate(subject)
    callSendAPI(sender_psid, response)
}

function showMaterialButtons(sender_psid) {
    let response = templates.MaterialButtonsTemplate()
    callSendAPI(sender_psid, response)
}

module.exports = {
    showMaterialMenu,
    handleMaterialRequest,
    handleSubjectResponse,
}
