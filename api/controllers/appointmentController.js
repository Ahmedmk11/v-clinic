import PatientModel from '../models/patientModel.js'
import AppointmentModel from '../models/appointmentsModel.js'
import DoctorModel from '../models/doctorModel.js'
import PrescriptionModel from '../models/prescriptionsModel.js'

const cancelAppointmentDoctor = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointment = await AppointmentModel.findById(appointmentId)
        if (!appointment) {
            return res.status(400).json({ message: 'Appointment not found' })
        }
        await AppointmentModel.findByIdAndUpdate(appointmentId, {
            status: 'cancelled',
        })
        const patient = await PatientModel.findByIdAndUpdate(
            appointment.patient_id
        )
        const doctor = await DoctorModel.findByIdAndUpdate(
            appointment.doctor_id
        )
        patient.wallet = patient.wallet + appointment.fee
        doctor.wallet = doctor.wallet - appointment.fee * 0.9
        await patient.save()
        await doctor.save()
        return res
            .status(200)
            .json({
                message: 'Appointment cancelled successfully',
                wallet: doctor.wallet,
            })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const cancelAppointmentPatient = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointment = await AppointmentModel.findById(appointmentId)
        if (!appointment) {
            return res.status(400).json({ message: 'Appointment not found' })
        }
        const Appointment = await AppointmentModel.findByIdAndUpdate(
            appointmentId,
            { status: 'cancelled' }
        )
        const patient = await PatientModel.findByIdAndUpdate(
            appointment.patient_id
        )
        const doctor = await DoctorModel.findByIdAndUpdate(
            appointment.doctor_id
        )
        if (appointment.start_time - Date.now() > 86400000) {
            patient.wallet = patient.wallet + appointment.fee
            doctor.wallet = doctor.wallet - appointment.fee * 0.9
            await patient.save()
            await doctor.save()
        }
        return res
            .status(200)
            .json({
                message: 'Appointment cancelled successfully',
                wallet: patient.wallet,
            })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const rescheduleAppointment = async (req, res) => {
    try {
        const { appointmentId, date, start_time, end_time } = req.body
        const appointment = await AppointmentModel.findById(appointmentId)
        if (!appointment) {
            return res.status(400).json({ message: 'Appointment not found' })
        }
        await AppointmentModel.findByIdAndUpdate(appointmentId, {
            date: date,
            start_time: start_time,
            end_time: end_time,
            status: 'rescheduled',
        })
        return res
            .status(200)
            .json({ message: 'Appointment rescheduled successfully' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const requestFollowUp = async (req, res) => {
    try {
        const { patient_id, doctor_id, date, start_time, end_time } = req.body
        const followUp = await AppointmentModel.create({
            patient_id,
            doctor_id,
            date,
            start_time,
            end_time,
            status: 'pending',
        })
        await followUp.populate([
            {
                path: 'doctor_id',
                model: 'Doctor',
            },
            {
                path: 'patient_id',
                model: 'Patient',
            },
        ])
        return res
            .status(200)
            .json({ message: 'Follow up requested successfully', followUp })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const acceptFollowUp = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointment = await AppointmentModel.findById(appointmentId)
        if (!appointment) {
            return res.status(400).json({ message: 'Appointment not found' })
        }
        await AppointmentModel.findByIdAndUpdate(appointmentId, {
            status: 'upcoming',
        })
        res.status(200).json({ message: 'Follow up accepted successfully' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const rejectFollowUp = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointment = await AppointmentModel.findById(appointmentId)
        if (!appointment) {
            return res.status(400).json({ message: 'Appointment not found' })
        }
        await AppointmentModel.findByIdAndUpdate(appointmentId, {
            status: 'rejected',
        })
        res.status(200).json({ message: 'Follow up rejected successfully' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const updatePrescription = async (req, res) => {
    try {
        const { appointmentId, prescription } = req.body
        const appointment = await AppointmentModel.findById(appointmentId)
        if (!appointment) {
            return res.status(400).json({ message: 'Appointment not found' })
        }
        const getPrescription = await PrescriptionModel.findOne({appointment_id: appointmentId})
        if (!getPrescription){
                await PrescriptionModel.create({
                    appointment_id: appointmentId,
                    patient_id: appointment.patient_id,
                    doctor_id: appointment.doctor_id,
                    medications: prescription.medications,
                    notes: prescription.notes,
            })
        }else{
            await PrescriptionModel.findByIdAndUpdate(getPrescription._id, {
                medications: prescription.medications,
                notes: prescription.notes,
                date: Date.now()
            })
        } 
        res.status(200).json({ message: 'Prescription updated successfully' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const getPrescription = async (req, res) => {
    try {
        const appointmentId  = req.params.id
        console.log(appointmentId)
        const getPrescription = await PrescriptionModel.findOne({appointment_id: appointmentId})
        if (!getPrescription){
            return res.status(400).json({ message: 'Prescription not found' })
        }else{
            return res.status(200).json(getPrescription)
        }
    } catch (error) {
        console.log(error)
    }
}

export {
    cancelAppointmentDoctor,
    cancelAppointmentPatient,
    rescheduleAppointment,
    requestFollowUp,
    acceptFollowUp,
    rejectFollowUp,
    updatePrescription,
    getPrescription
}
