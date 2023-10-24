import mongoose from 'mongoose';
const medicalHistorySchema = new mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    chronicConditions: [
        {
            name: {
                type: String,
                required: true,
            },
            diagnosedDate: {
                type: Date,
                required: true,
            },
            medications: {
                type: [String],
                default: [],
            },
            notes: String,
        },
    ],
    surgeries: [
        {
            name: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                required: true,
            },
            notes: String,
        },
    ],
    allergies: [
        {
            name: {
                type: String,
                required: true,
            },
            reaction: String,
        },
    ],
    familyHistory: {
        parents: {
            conditions: {
                type: [String],
                default: [],
            },
        },
        siblings: {
            conditions: {
                type: [String],
                default: [],
            },
        },
    },
    lifestyle: {
        smoking: String,
        alcoholConsumption: String,
        exerciseFrequency: String,
        diet: String,
    }
},{ timestamps: true } );

const MedicalHistoryModel = mongoose.model('MedicalHistory', medicalHistorySchema);

export default MedicalHistoryModel;
