import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

const patientModel = new mongoose.Schema(
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
                        return /^[A-Za-z0-9]{8,}$/.test(value)
                    },
                    message:
                        'Password must be at least 8 characters long and contain at least one letter.',
                },
            ],
        },
        birthdate: {
            type: Date,
            required: [true, 'Please enter your birthdate.'],
        },
        gender: {
            type: String,
            required: [true, 'Please select your gender.'],
        },
        phoneNumber: {
            type: String,
            required: [true, 'Please enter your phone number.'],
            phoneNumber: {
                type: String,
                required: [true, 'Please enter your phone number'],
                validate: [
                    {
                        validator: function (value) {
                            return /^[0-9\s()+-]+$/.test(value)
                        },
                        message:
                            'Phone number can only contain numbers, spaces, brackets, hyphens, and plus signs.',
                    },
                ],
            },
        },
        emergencyName: {
            type: String,
            required: [
                true,
                'Please enter the name of your emergency contact.',
            ],
            validate: [
                {
                    validator: function (value) {
                        return /^[A-Za-z\s]+$/.test(value)
                    },
                    message: 'Name must contain only letters and spaces.',
                },
            ],
        },
        emergencyPhoneNumber: {
            type: String,
            required: [
                true,
                'Please enter the phone number of your emergency contact.',
            ],
            phoneNumber: {
                type: String,
                required: [true, 'Please enter your phone number'],
                validate: [
                    {
                        validator: function (value) {
                            return /^[0-9\s()+-]+$/.test(value)
                        },
                        message:
                            'Phone number can only contain numbers, spaces, brackets, hyphens, and plus signs.',
                    },
                ],
            },
        },
        package: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Package',
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)
patientModel.pre('save', async function () {
    if (!this.isModified('password')) return

    this.password = await bcrypt.hash(this.password, 12)
})

patientModel.methods.comparePassword = async function (
    enteredPassword,
    hashedPassword
) {
    return await bcrypt.compare(enteredPassword, hashedPassword)
}

patientModel.virtual('appointements', {
    ref: 'Appointement',
    foreignField: 'patient_id',
    localField: '_id',
})

const PatientModel = mongoose.model('Patient', patientModel)

export default PatientModel
