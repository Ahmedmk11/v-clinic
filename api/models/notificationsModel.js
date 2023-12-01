import mongoose from 'mongoose'

const notificationsModel = new mongoose.Schema(
    {
        appointment_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Appointments',
        },
        doctor_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor',
        },
        patient_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
        },
        date: {
            type: Date,
        },
        message_patient: {
            type: String,
            required: [true, 'A notification must have a message'],
        },
        message_doctor: {
            type: String,
            required: [true, 'A notification must have a message'],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

const NotificationsModel = mongoose.model('Notifications', notificationsModel)

export default NotificationsModel
