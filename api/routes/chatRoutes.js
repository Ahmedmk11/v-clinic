import express from 'express'
import {
    newChat,
    getChats,
    newMessage,
    getMessages,
    getDoctorContacts,
    getPatientContacts
} from '../controllers/chatController.js'
const router = express.Router()

router.post('/create-chat', newChat)
router.get('/get-chats/:userId', getChats)
router.post('/send-message', newMessage)
router.get('/get-messages/:conversationId', getMessages)
router.get('/get-doctor-contacts/:doctorId', getDoctorContacts)
router.get('/get-patient-contacts/:patientId', getPatientContacts)
export default router
