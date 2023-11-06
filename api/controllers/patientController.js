import PatientModel from '../models/patientModel.js'
import AppointmentModel from '../models/appointmentsModel.js'
import FamilyMemberModel from '../models/familyMemberModel.js'
import PrescriptionModel from '../models/prescriptionsModel.js'
import MedicalHistoryModel from '../models/medicalHistoryModel.js'
import multer from 'multer'
import crypto from 'crypto'
// --------------------------------------------------
// Multer
// --------------------------------------------------
const patientStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/patientUploads')
    },
    filename: (req, file, cb) => {
        const fileName = crypto.randomBytes(16).toString('hex')
        const extension = file.mimetype.split('/')[1]
        cb(null, `${fileName}.${extension}`)
    },
})

const patientUpload = multer({ storage: patientStorage })

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
        const MedicalHistory = new MedicalHistoryModel({
            patient_id: newPatient._id,
        })
        await MedicalHistory.save()
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
        const { id } = req.params
        let patient = await PatientModel.findById(id)
            .populate('prescriptions')
            .populate('medicalHistory')
        patient = {
            ...patient._doc,
            prescriptions: patient.prescriptions,
            medicalHistory: patient.medicalHistory,
        }
        res.status(200).json(patient)
    } catch (err) {
        console.error('Error fetching patient:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function getPatientsByDoctorID(req, res) {
    try {
        const { id } = req.params
        const appointments = await AppointmentModel.find({
            doctor_id: id,
        })
        const patientIds = appointments.map(
            (appointment) => appointment.patient_id
        )
        let patients = await PatientModel.find({
            _id: { $in: patientIds },
        })
            .populate('prescriptions')
            .populate('medicalHistory')
        patients = patients.map((patient) => {
            return {
                ...patient._doc,
                prescriptions: patient.prescriptions,
                medicalHistory: patient.medicalHistory,
                nextAppointment: getPatientNextAppointment(
                    patient.id,
                    appointments
                ),
                lastVisit: getPatientLastVisit(patient.id, appointments),
            }
        })
        res.status(200).json(patients)
    } catch (err) {
        console.error('Error fetching patients by doctor id:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

function getPatientLastVisit(patientId, appointments) {
    const patientAppointemnts = appointments.filter(
        (appointment) =>
            appointment.patient_id == patientId && appointment.date < new Date()
    )
    let lastVisit = null
    for (let i = 0; i < patientAppointemnts.length; i++)
        if (lastVisit === null || patientAppointemnts[i].date > lastVisit)
            lastVisit = patientAppointemnts[i].date

    return lastVisit
}

function getPatientNextAppointment(patientId, appointments) {
    const patientAppointemnts = appointments.filter(
        (appointment) =>
            appointment.patient_id == patientId &&
            appointment.date >= new Date()
    )
    let nextAppointment = null
    for (let i = 0; i < patientAppointemnts.length; i++)
        if (
            nextAppointment === null ||
            patientAppointemnts[i].date < nextAppointment
        )
            nextAppointment = patientAppointemnts[i].date

    return nextAppointment
}

async function getPatientAppointments(req, res) {
    try {
        let patient = await PatientModel.findById(req.params.id)
        if (patient) {
            patient = await patient.populate('appointments')
            res.json(patient.appointments)
        } else res.status(404).json({ message: 'Patient not found' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getPatientPrescription(req, res) {
    try {
        const patient = await PatientModel.findById(req.params.id)
        if (patient) {
            const populatedPatient = await patient.populate({
                path: 'prescriptions',
                populate: {
                    path: 'doctor_id',
                    model: 'Doctor',
                },
            })
            let prescriptions = populatedPatient.prescriptions.map(
                (prescription) => {
                    const { doctor_id, ...rest } = prescription._doc
                    return {
                        ...rest,
                        doctorName: prescription.doctor_id.name,
                    }
                }
            )
            res.json(prescriptions)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

async function getFamilyMembers(req, res) {
    try {
        let patient = await PatientModel.findById(req.params.id)
        if (patient) {
            patient = await patient.populate('familymembers')
            res.json(patient.familymembers)
        } else res.status(404).json({ message: 'Patient not found' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function populateFamilyMembers(req, res) {
    try {
        const newFamilyMember = new FamilyMemberModel(req.body)
        await newFamilyMember.save()
        let patient = await PatientModel.findById(req.params.id)
        if (patient) {
            patient = await patient.populate('familymembers')
            res.json(patient.familymembers)
        } else res.status(404).json({ message: 'Patient not found' })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

async function getPatientDiscount(req, res) {
    try {
        let patient = await PatientModel.findById(req.params.id)
        if (patient) {
            patient = await patient.populate('package')
            res.json(patient.package)
        } else res.status(404).json({ message: 'Patient not found' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function testingAddPackage(req, res) {
    // for adding a package to patient to test the discounted session price, change in next sprint
    try {
        await PatientModel.findByIdAndUpdate(req.params.id, {
            package: '652299326ad7a764de83a2aa',
        })
    } catch (error) {}
}

//@ desc add medical history to patient
//@route POST /api/patients/add-medical-history
const addMedicalHistory = async (req, res) => {
    try {
        const { medicalHistory } = req.body
        console.log(medicalHistory)
        const newMedicalHistory = new MedicalHistoryModel(medicalHistory)

        await newMedicalHistory.save()
        res.status(201).json(newMedicalHistory)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

//@ desc update medical history to patient
//@route PUT /api/patients/update-medical-history/:id
const updateMedicalHistory = async (req, res) => {
    try {
        const { id } = req.params
        const { medicalHistory } = req.body

        const updatedMedicalHistory =
            await MedicalHistoryModel.findOneAndUpdate(
                { patient_id: id },
                medicalHistory,
                { new: true }
            )

        res.status(201).json(updatedMedicalHistory)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

//@desc add appointment to patient
//@route POST /api/patients/add-appointment
const addAppointment = async (req, res) => {
    try {
        const appointment = new AppointmentModel(req.body)
        await appointment.save()
        res.status(201).json(appointment)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

const savePatientfiles = patientUpload.array('files')

const uploadPatientFiles = async (req, res) => {
    try {
        const { id } = req.body
        const files = req.files
        if (!files?.length)
            return res.status(400).json({ message: 'No files uploaded' })
        const patient = await PatientModel.findById(id)
        if (patient) {
            const newFilePaths = files.map((file) => file.path)
            patient.health_records = [
                ...patient.health_records,
                ...newFilePaths,
            ]
            await patient.save()
            res.status(201).json({
                message: 'Files uploaded successfully',
                UploadedMedicalRecords: patient.health_records,
            })
        } else res.status(404).json({ message: 'Patient not found' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

export {
    createPatient,
    getPatients,
    getPatientByID,
    getPatientsByDoctorID,
    getPatientAppointments,
    getPatientPrescription,
    getFamilyMembers,
    populateFamilyMembers,
    getPatientDiscount,
    testingAddPackage,
    addMedicalHistory,
    updateMedicalHistory,
    addAppointment,
    savePatientfiles,
    uploadPatientFiles,
}
