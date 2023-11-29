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
            enum: [
                'upcoming',
                'completed',
                'cancelled',
                'rescheduled',
                'pending',
                'rejected',
            ],
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
        end_time: {
            type: Date,
            required: true,
        },
        fee: {
            type: Number,
            default: 0,
        },
    },

    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

const AppointmentModel = mongoose.model('Appointment', appointmentsSchema)

// Check for upcoming appointments and update status
const updateAppointmentStatus = async () => {
    const currentTime = new Date()
    await AppointmentModel.updateMany(
        //update status upcoming or rescheduled to completed
        {
            end_time: { $lt: currentTime },
            $or: [{ status: 'upcoming' }, { status: 'rescheduled' }],
        },
        { $set: { status: 'completed' } }
    )
    await AppointmentModel.updateMany(
        { end_time: { $lt: currentTime }, status: 'pending' },
        { $set: { status: 'rejected' } }
    )
    console.log('Appointment statuses updated.')
}

// Run the update function every minute (adjust the schedule based on your needs)
setInterval(updateAppointmentStatus, 3600000) // 60000 milliseconds = 1 minute

export default AppointmentModel
