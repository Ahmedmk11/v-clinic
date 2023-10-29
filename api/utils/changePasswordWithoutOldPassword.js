import PatientModel from '../models/patientModel.js'
import DoctorModel from '../models/doctorModel.js'
import adminModel from '../models/adminModel.js'

export async function changePasswordWithoutOldPassword(
    email,
    role,
    newPassword
) {
    try {
        const user = await (role === 'patient'
            ? PatientModel.findOne({ email: email })
            : role === 'doctor'
            ? DoctorModel.findOne({ email: email })
            : adminModel.findOne({ email: email }))

        if (!user) {
            return 404
        }

        user.password = newPassword
        await user.save()
    } catch (error) {
        console.log(error)
        return 500
    }
}
