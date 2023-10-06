import mongoose from 'mongoose'

const appointmentsSchema = new mongoose.Schema(
    {
        doctor_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Doctor',
        },
        patient_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Patient',
        },
        status: {
            type: String,
            enum: ['upcoming', 'completed', 'cancelled', 'rescheduled'],
            default: 'upcoming',
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        start_time: {
            type: Date,
            required: true,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

const AppointmentModel = mongoose.model('Appointment', appointmentsSchema)

export default AppointmentModel
