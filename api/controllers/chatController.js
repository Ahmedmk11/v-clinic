import ConversationModel from '../models/conversationModel.js'
import MessageModel from '../models/messageModel.js'
import AppointmentModel from '../models/appointmentsModel.js'

const newChat = async (req, res) => {
    try {
        const { sender, receiver, senderName, receiverName } = req.body
        const oldChat = await ConversationModel.findOne({
            members: { $all: [sender, receiver] },
        })
        if (oldChat) {
            return res.status(200).json({ message: 'Chat already exists',chat:oldChat })
        }
        const chat = new ConversationModel({
            members: [sender, receiver],
            membersInfo: [senderName, receiverName],
        })
        await chat.save()
        res.status(201).json({ message: 'Chat created successfully', chat })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

const getChats = async (req, res) => {
    try {
        const { userId } = req.params
        const chats = await ConversationModel.find({
            members: { $in: [userId] },
        })
        res.status(200).json(chats)
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

const newMessage = async (req, res) => {
    const newMessage = new MessageModel(req.body)
    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (err) {
        res.status(500).json(err)
    }
}

const getMessages = async (req, res) => {
    const { conversationId } = req.params
    try {
        const messages = await MessageModel.find({
            conversationId: conversationId,
        })
        res.status(200).json(messages)
    } catch (err) {
        res.status(500).json(err)
    }
}

const getDoctorContacts = async (req, res) => {
    const { doctorId } = req.params
    try {
        const chats = await ConversationModel.find({
            members: { $in: [doctorId] },
        })
        const appointments = await AppointmentModel.find({
            doctor_id: doctorId,
            status: 'completed',
        }).populate('patient_id', 'name')
        let contacts = appointments.filter((appointment) => {
            return !chats.some((chat) =>
                chat.members.includes(appointment.patient_id._id)
            )
        })
        contacts = contacts.map((contact) => {
            return {
                _id: contact.patient_id._id,
                name: contact.patient_id.name,
            }
        })
        contacts = contacts.filter((contact, index) => {
            return contacts.findIndex((obj) => obj._id == contact._id) === index
        })

        res.status(200).json(contacts)
    } catch (err) {
        res.status(500).json(err)
    }
}

const getPatientContacts = async (req, res) => {
    const { patientId } = req.params
    try {
        const chats = await ConversationModel.find({
            members: { $in: [patientId] },
        })
        const appointments = await AppointmentModel.find({
            patient_id: patientId,
            status: 'completed',
        }).populate('doctor_id', 'name')
        let contacts = appointments.filter((appointment) => {
            return !chats.some((chat) =>
                chat.members.includes(appointment.doctor_id._id)
            )
        })
        contacts = contacts.map((contact) => {
            return {
                _id: contact.doctor_id._id,
                name: contact.doctor_id.name,
            }
        })
        contacts = contacts.filter((contact, index) => {
            return contacts.findIndex((obj) => obj._id == contact._id) === index
        })
        res.status(200).json(contacts)
    } catch (err) {
        res.status(500).json(err)
    }
}

export {
    newChat,
    getChats,
    newMessage,
    getMessages,
    getDoctorContacts,
    getPatientContacts,
}
