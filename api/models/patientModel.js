import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const patientModel = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    birthdate: Date,
    gender: String,
    phoneNumber: String,
    emergencyName: String,
    emergencyPhoneNumber: String,
})

patientModel.pre('save', async function (next) {
    const patient = this

    if (!patient.isModified('password')) return next()

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(patient.password, salt)
        patient.password = hashedPassword
        next()
    } catch (error) {
        return next(error)
    }
})

const PatientModel = mongoose.model('Patient', patientModel)

export default PatientModel
