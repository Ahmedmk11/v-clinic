import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

const doctorSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please enter your username'],
            unique: true,
            lowercase: true,
            minlength: [
                4,
                'Please enter a username that is 4 characters or longer',
            ],
            maxlength: [
                20,
                'Please enter a username that is 20 characters or shorter',
            ],
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: [true, 'Please enter a password'],
            minlength: [
                6,
                'Please enter a password that is 6 characters or longer',
            ],
            select: false,
        },
        email: {
            type: String,
            required: [true, 'Please enter your email'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please enter a valid email'],
        },
        dob: {
            type: Date,
        },
        hourly_rate: {
            type: Number,
            required: [true, 'Please enter your hourly rate'],
        },
        affiliation: {
            type: String,
            required: [true, 'Please enter your affiliation'],
        },
        education: {
            type: String,
            required: [true, 'Please enter your education'],
        },
        status: {
            type: String,
            enum: ['active', 'pending'],
            default: 'pending',
        },
        speciality: {
            type: String,
            required: [true, 'Please enter your speciality'],
            default: 'general',
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

doctorSchema.pre('save', async function () {
    if (!this.isModified('password')) return

    this.password = await bcrypt.hash(this.password, 12)
})

doctorSchema.methods.comparePassword = async function (
    enteredPassword,
    hashedPassword
) {
    return await bcrypt.compare(enteredPassword, hashedPassword)
}

doctorSchema.virtual('appointements', {
    ref: 'Appointement',
    foreignField: 'doctor_id',
    localField: '_id',
})

export default mongoose.model('Doctor', doctorSchema)
