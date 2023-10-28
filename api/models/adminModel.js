import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

const Schema = mongoose.Schema

const adminSchema = new Schema(
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
    },
    { timestamps: true }
)

adminSchema.pre('save', async function () {
    if (!this.isModified('password')) return

    this.password = await bcrypt.hash(this.password, 12)
})

adminSchema.methods.comparePassword = async function (
    enteredPassword,
    hashedPassword
) {
    return await bcrypt.compare(enteredPassword, hashedPassword)
}

const adminModel = mongoose.model('Admin', adminSchema)
export default adminModel
