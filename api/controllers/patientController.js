import PatientModel from '../models/patientModel.js'
import AppointmentModel from '../models/appointmentsModel.js'

async function createPatient(req, res) {
    try {
        const {
            username,
            name,
            email,
            password,
            birthdate,
            gender,
            phoneNumber,
            emergencyName,
            emergencyPhoneNumber,
        } = req.body

        const newPatient = new PatientModel({
            username,
            name,
            email,
            password,
            birthdate,
            gender,
            phoneNumber,
            emergencyName,
            emergencyPhoneNumber,
        })

        await newPatient.save()
        res.status(201).json(newPatient)
    } catch (err) {
        console.error('Error creating patient:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function getPatients(req, res) {
    try {
        const patients = await PatientModel.find()
        res.status(200).json(patients)
    } catch (err) {
        console.error('Error fetching patients:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function getPatientByID(req, res) {
    try {
        const { pid } = req.body
        const patient = await PatientModel.findById(pid)
        res.status(200).json(patient)
    } catch (err) {
        console.error('Error fetching patient:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function getPatientsByDoctorID(req, res) {
    try {
        const { did } = req.params
        const appointments = await AppointmentModel.find({
            doctor_id: did,
        })
        const patientIds = appointments.map(
            (appointment) => appointment.patient_id
        )
        const patients = await PatientModel.find({ _id: { $in: patientIds } })
        res.status(200).json(patients)
    } catch (err) {
        console.error('Error fetching patients by doctor id:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function getPatientAppointments(req, res) {
    try {
        const patient = await PatientModel.findById(req.params.id)
        if (patient) {
            const appointments = await patient
                .populate('appointments')
                .execPopulate()
            res.json(appointments)
        }
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export {
    createPatient,
    getPatients,
    getPatientByID,
    getPatientsByDoctorID,
    getPatientAppointments,
}
