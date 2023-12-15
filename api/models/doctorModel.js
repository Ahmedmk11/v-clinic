import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

const doctorSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please enter your username.'],
            unique: [true, 'Username is taken.'],
            lowercase: true,
            validate: [
                validator.isAlphanumeric,
                'Please enter a valid username.',
            ],
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
            required: [true, 'Please enter your name.'],
            validate: [
                {
                    validator: function (value) {
                        return /^[A-Za-z\s]+$/.test(value)
                    },
                    message: 'Name must contain only letters and spaces.',
                },
            ],
        },
        email: {
            type: String,
            required: [true, 'Please enter your email.'],
            unique: [true, 'Email is taken.'],
            lowercase: true,
            validate: [
                validator.isEmail,
                'Please enter a valid email address.',
            ],
        },
        password: {
            type: String,
            required: [true, 'Please enter your password.'],
            validate: [
                {
                    validator: function (value) {
                        return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value)
                    },
                    message:
                        'Password must be at least 8 characters long and contain at least one letter.',
                },
            ],
        },
        dob: {
            type: Date,
            required: [true, 'Please enter your date of birth'],
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
        wallet: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ['Active', 'Pending', 'Rejected'],
            default: 'Pending',
        },
        contract_acceptance: {
            type: String,
            enum: ['Accepted', 'Pending', 'Rejected'],
            default: 'Pending',
        },
        speciality: {
            type: String,
            required: [true, 'Please enter your speciality'],
            default: 'General',
        },
        uploaded_documents: {
            type: [String],
            default: [],
        },
        timeSlots: {
            type: [
                {
                    day: {
                        type: String,
                        enum: [
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                            'Sunday',
                        ],
                    },
                    slots: [
                        {
                            startTime: {
                                type: String,
                            },
                            endTime: {
                                type: String,
                            },
                        },
                    ],
                },
            ],
            default: [],
        },
    },
    { timestamps: true},
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

doctorSchema.virtual('appointments', {
    ref: 'Appointment',
    foreignField: 'doctor_id',
    localField: '_id',
})

const DoctorModel = mongoose.model('Doctor', doctorSchema)
export default DoctorModel
