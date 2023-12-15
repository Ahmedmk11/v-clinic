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
                {
                    validator: function (value) {
                        return /^[A-Za-z0-9_\.]+$/.test(value)
                    },
                    message:
                        'Please enter a valid username. It should contain only numbers, alphabets, underscores, or periods.',
                },
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
        wallet: {
            type: Number,
            default: 0,
        },
        birthdate: {
            type: Date,
            required: [true, 'Please enter your birthdate.'],
        },
        gender: {
            type: String,
            required: [true, 'Please select your gender.'],
        },
        nid: {
            type: String,
            required: [true, 'Please enter your national ID.'],
        },
        phoneNumber: {
            type: String,
            required: [true, 'Please enter your phone number.'],
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
            required: [true, 'Please enter an emergency phone number.'],
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
        emergencyRelation: {
            type: String,
            required: [
                true,
                'Please enter the name of your emergency relation.',
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
        package: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Package',
        },
        health_records: {
            //array of objects path and original name
            type: [
                {
                    path: {
                        type: String,
                        required: [
                            true,
                            'Please enter the path of the document.',
                        ],
                    },
                    originalname: {
                        type: String,
                        required: [
                            true,
                            'Please enter the original name of the document.',
                        ],
                    },
                },
            ],
            default: [],
        },
        linkingCode: {
            type: String,
            unique: true,
        },
        packageRenewalDate: {
            type: Date,
            default: null,
            require: true,
        },
        packageStatus: {
            type: String,
            enum: ['Active', 'Inactive'],
            default: 'Inactive',
        },
        isAutoRenewalBlocked: {
            type: Boolean,
            default: false,
        },
        deliveryAddress: [
            {
                street_address: { type: String, required: true },
                city: { type: String, required: true },
                governate: { type: String, required: true },
                is_default: { type: Boolean, default: false },
            },
        ],
    },
    { timestamps: true },
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

patientModel.virtual('appointments', {
    ref: 'Appointment',
    foreignField: 'patient_id',
    localField: '_id',
})

patientModel.virtual('prescriptions', {
    ref: 'Prescription',
    foreignField: 'patient_id',
    localField: '_id',
})

patientModel.virtual('familymembers', {
    ref: 'FamilyMember',
    foreignField: 'patient_id',
    localField: '_id',
})

patientModel.virtual('medicalHistory', {
    ref: 'MedicalHistory',
    foreignField: 'patient_id',
    localField: '_id',
})

patientModel.virtual('cart', {
    ref: 'Cart',
    foreignField: 'patient_id',
    localField: '_id',
})

const PatientModel = mongoose.model('Patient', patientModel)

export default PatientModel
