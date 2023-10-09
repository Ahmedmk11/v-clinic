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

// Check for upcoming appointments and update status
const updateAppointmentStatus = async () => {
    const currentTime = new Date();
    await AppointmentModel.updateOne(
        { end_time: { $lt: currentTime }, status: 'upcoming' },
        { $set: { status: 'completed' } }
    );
    console.log('Appointment statuses updated.');
};

// Run the update function every minute (adjust the schedule based on your needs)
setInterval(updateAppointmentStatus, 3600000); // 60000 milliseconds = 1 minute

export default AppointmentModel
