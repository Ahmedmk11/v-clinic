import mongoose from 'mongoose'

const packageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
        sessionDiscount: {
            type: Number,
            min: [0, 'enter a positive number at max 100'],
            max: [0, 'enter a positive number at max 100'],
            required: true,
        },
        medicineDiscount: {
            type: Number,
            min: [0, 'enter a positive number at max 100'],
            max: [0, 'enter a positive number at max 100'],
            required: true,
        },
        familySubsDiscount: {
            type: Number,
            min: [0, 'enter a positive number at max 100'],
            max: [0, 'enter a positive number at max 100'],
            required: true,
        }
    }
)

export default mongoose.model('package', packageSchema)