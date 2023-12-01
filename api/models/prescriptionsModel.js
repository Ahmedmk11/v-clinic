import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter the name of the prescription.'],
            default: 'Prescription'
        },
        appointment_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Appointment',
        },
        patient_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Patient',
        },
        doctor_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Doctor',
        },
        status: {
            type: String,
            enum: ['filled', 'unfilled'],
            default: 'unfilled',
        },
        date: {
            type: Date,
            default: Date.now,
        },
        medications: [{
            medicine_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'medicine',
            },
            name: {
                type: String,
                required: [true, 'Please enter the medicine name.'],
            },
            dosage: {
                type: String,
                required: [true, 'Please enter the dosage.'],
            },
            frequency: {
                type: String,
                required: [true, 'Please enter the frequency.'],
            },
            duration: {
                type: String,
                required: [true, 'Please enter the duration.'],
            }
        }],
        notes: {
            type: String,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const PrescriptionModel = mongoose.model('Prescription', prescriptionSchema);

export default PrescriptionModel;
