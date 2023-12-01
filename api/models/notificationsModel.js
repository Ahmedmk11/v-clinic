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
        type: {
            type: String,
            enum: ['patient', 'doctor'],
            required: [true, 'A notification must be for a patient or doctor'],
        },
        date: {
            type: Date,
        },
        message: {
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
