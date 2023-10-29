import PatientModel from '../models/patientModel.js'
import DoctorModel from '../models/doctorModel.js'
import adminModel from '../models/adminModel.js'

export async function changePasswordWithOldPassword(
    id,
    role,
    oldPassword,
    newPassword
) {
    try {
        const user =
            role === 'patient'
                ? await PatientModel.findById(id)
                : role === 'doctor'
                ? await DoctorModel.findById(id)
                : await adminModel.findById(id)

        if (!user) {
            return 404
        }

        const isMatch = await user.comparePassword(oldPassword, user.password)

        if (!isMatch) {
            return 403
        }
        user.password = newPassword
        await user.save()
    } catch (error) {
        console.log(error)
        return 500
    }
}
