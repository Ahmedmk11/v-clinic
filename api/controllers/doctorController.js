import DoctorModel from '../models/doctorModel.js'
import PatientModel from '../models/patientModel.js'

import ConversationModel from '../models/conversationModel.js'
import MessageModel from '../models/messageModel.js'
import Medicine from '../models/medicineModel.js'
import PrescriptionModel from '../models/prescriptionsModel.js'
import multer from 'multer'
import crypto from 'crypto'

// --------------------------------------------------
// Multer
// --------------------------------------------------
const doctorStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/doctorUploads')
    },
    filename: (req, file, cb) => {
        const fileName = crypto.randomBytes(16).toString('hex')
        const extension = file.mimetype.split('/')[1]
        cb(null, `${fileName}.${extension}`)
    },
})

const doctorUpload = multer({ storage: doctorStorage })

// @desc    Create a doctor
// @route   POST /api/doctor/create-doctor
// @access  Public
const createDoctor = async (req, res) => {
    try {
        const {
            username,
            name,
            password,
            email,
            dob,
            hourly_rate,
            affiliation,
            education,
            speciality,
        } = req.body
        const newDoctor = new DoctorModel({
            username,
            name,
            password,
            email,
            dob: new Date(dob),
            hourly_rate,
            affiliation,
            education,
            speciality,
        })

        await newDoctor.save()
        res.status(201).json(newDoctor)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

// @desc    Get all doctors
// @route   GET /api/doctor/get-doctors
// @access  Public
const getDoctors = async (req, res) => {
    try {
        const doctors = await DoctorModel.find({})
        res.json(doctors)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// @desc    Get all active doctors
// @route   GET /api/doctor/get-active-doctors
// @access  Public
const getActiveDoctors = async (req, res) => {
    try {
        const doctors = await DoctorModel.find({
            status: 'Active',
            contract_acceptance: 'Accepted',
        })
        res.json(doctors)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const getMedicineByName = async (req, res) => {
    try {
        const ret = await Medicine.find({ name: req.params.name })
        res.json(ret)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const getAllMedicines = async (req, res) => {
    try {
        const dbQuery = await Medicine.find()
        const medicines = dbQuery
        res.status(200).json(medicines)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const editMedicineByName = async (req, res) => {
    try {
        const medName = req.body.name
        const aid = req.body.aid
        const prescription = await PrescriptionModel.findOne({
            appointment_id: aid,
        })

        const medicationsPrescription = prescription.medications

        if (medicationsPrescription) {
            // without the aid field
            const newMed = req.body
            delete newMed.aid
            const medIndex = medicationsPrescription.findIndex(
                (med) => med.name === medName
            )
            medicationsPrescription[medIndex] = newMed
            await prescription.save()

            const prescriptionRes = await PrescriptionModel.findOne({
                appointment_id: aid,
            })

            const medicationsRes = prescriptionRes.medications

            res.status(200).json({
                message: 'Medicine edited successfully',
                medications: medicationsRes,
            })
        } else {
            res.status(404).json({ message: 'Medicine not found' })
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

// @desc    Get a doctor by id
// @route   GET /api/doctor/get-doctor/:id
// @access  Public
const getDoctorById = async (req, res) => {
    try {
        const doctor = await DoctorModel.findById(req.params.id)
        res.json(doctor)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// @desc    Get a patient by doctor id
// @route   GET /api/doctor/get-patient/:id
// @access  Public
const getPatientByDoctorId = async (req, res) => {
    try {
        const { doctor_id, patient_id } = req.params
        let patient = await PatientModel.findById(patient_id)
            .populate('prescriptions')
            .populate('medicalHistory')
            .populate('package')
        patient = {
            ...patient._doc,
            prescriptions: patient.prescriptions.filter((prescription) =>
                prescription.doctor_id.equals(doctor_id)
            ),
            medicalHistory: patient.medicalHistory,
        }
        res.status(200).json(patient)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// @desc    Update a doctor by id
// @route   PUT /api/doctor/update-doctor
// @access  Public
const updateDoctor = async (req, res) => {
    try {
        const doctor = await DoctorModel.findById(req.body._id)
        if (doctor) {
            doctor.email = req.body.email || doctor.email
            doctor.hourly_rate = req.body.hourly_rate || doctor.hourly_rate
            doctor.affiliation = req.body.affiliation || doctor.affiliation
            doctor.speciality = req.body.speciality || doctor.speciality
            const updatedDoctor = await doctor.save()
            res.json(updatedDoctor)
        } else res.status(404).json({ message: 'Doctor not found' })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// @desc    Get all appointments by doctor id
// @route   GET /api/doctor/get-appointments/:id
// @access  Public
const getAppointmentsByDoctorId = async (req, res) => {
    try {
        let doctor = await DoctorModel.findById(req.params.id)
        if (doctor) {
            doctor = await doctor.populate('appointments')
            res.json(doctor.appointments)
        } else res.status(404).json({ message: 'Doctor not found' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// @desc    Get all appointments by doctor id with patient names
//@route    GET /api/doctor/get-appointments-with-names/:id
//@access   Public
const getAppointmentsWithNamesByDoctorId = async (req, res) => {
    try {
        let doctor = await DoctorModel.findById(req.params.id)
        if (doctor) {
            doctor = await doctor.populate({
                path: 'appointments',
                populate: {
                    path: 'patient_id',
                    model: 'Patient', // Replace 'Patient' with the actual name of your PatientModel
                },
            })
            res.json(doctor.appointments)
        } else res.status(404).json({ message: 'Doctor not found' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//@desc   save doctor files
//@route  POST /api/doctor/upload
//@access Public
const saveDoctorfiles = doctorUpload.array('files')

// @desc    Upload a doctor image
// @route   POST /api/doctor/upload
// @access  Public
const uploadDoctorFiles = async (req, res) => {
    try {
        const id = req.body.id
        const files = req.files
        if (!files?.length)
            return res.status(400).json({ message: 'No files uploaded' })
        const doctor = await DoctorModel.findById(id)
        if (doctor) {
            const newFilePaths = files.map((file) => file.path)
            doctor.uploaded_documents =
                doctor.uploaded_documents.concat(newFilePaths)
            doctor.save()
            res.json({
                message: 'Files uploaded successfully',
                uploaded_documents: doctor.uploaded_documents,
            })
        } else {
            res.status(404).json({ message: 'Doctor not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// @desc    Update a doctor contract acceptance
// @route   PUT /api/doctor/update-contract
// @access  Public
const updateContract = async (req, res) => {
    try {
        const doctor = await DoctorModel.findById(req.body.id)
        if (doctor) {
            doctor.contract_acceptance = req.body.contract_acceptance
            const updatedDoctor = await doctor.save()
            res.json({
                message: 'Contract updated successfully',
                contract_acceptance: updatedDoctor.contract_acceptance,
            })
        } else res.status(404).json({ message: 'Doctor not found' })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

//@desc  get doctor files
//@route post /api/doctor/updateTimeSlots
//@access public
const updateTimeSlots = async (req, res) => {
    try {
        const doctor = await DoctorModel.findById(req.body.id)
        if (doctor) {
            doctor.timeSlots = req.body.newTimeSlots
            const updatedDoctor = await doctor.save()
            res.json({
                message: 'Time Slots updated successfully',
                newTimeSlots: updatedDoctor.timeSlots,
            })
        } else res.status(404).json({ message: 'Doctor not found' })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const checkUsernameAvailability = async (req, res) => {
    try {
        const { username } = req.params
        const isTaken = await DoctorModel.findOne({ username: username })
        if (!isTaken) {
            res.status(202).json({ message: 202 })
        } else {
            res.status(200).json({ message: 200 })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const checkEmailAvailability = async (req, res) => {
    try {
        const { email } = req.params
        const isTaken = await DoctorModel.findOne({ email: email })
        if (!isTaken) {
            res.status(202).json({ message: 202 })
        } else {
            res.status(200).json({ message: 200 })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteMedicine = async (req, res) => {
    try {
        const { id, medId } = req.params

        const prescription = await PrescriptionModel.findOne({
            appointment_id: id,
        })
        const medicationsPrescription = prescription.medications
        if (medicationsPrescription) {
            const medIndex = medicationsPrescription.findIndex(
                (med) => med._id == medId
            )
            medicationsPrescription.splice(medIndex, 1)
            await prescription.save()
            const prescriptionRes = await PrescriptionModel.findOne({
                appointment_id: id,
            })
            const medicationsRes = prescriptionRes.medications
            res.status(200).json({
                message: 'Medicine deleted successfully',
                medications: medicationsRes,
            })
        } else {
            res.status(404).json({ message: 'Medicine not found' })
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const dashboard = async (req, res) => {
    try {
        const { id } = req.params
        let doctor = await DoctorModel.findById(id)
        doctor = await doctor.populate({
            path: 'appointments',
            populate: {
                path: 'patient_id',
                model: 'Patient',
            },
        })
        const nextAppointment = getNextAppointment(doctor.appointments)
        const pastWeekAppointments = getPastWeekAppointments(
            doctor.appointments
        )
        const conversations = await ConversationModel.find({
            members: { $in: [id] },
        })
        //get all messages of all conversations
        // eslint-disable-next-line no-undef
        const messages = await Promise.all(
            conversations.map(async (conversation) => {
                const messages = await MessageModel.find({
                    conversationId: conversation._id,
                    sender: { $ne: doctor._id },
                })
                return messages
            })
        )
        const lastMessage = getLastMessage(messages, conversations, doctor.name)

        const doctorStats = getDoctorStats(doctor.appointments)

        res.status(200).json({
            nextAppointment,
            pastWeekAppointments,
            lastMessage,
            doctorStats,
        })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const getNextAppointment = (appointments) => {
    if (appointments.length === 0)
        return [{ patientName: 'No Upcoming Appointments' }]
    appointments = appointments.filter((appointment) => {
        const today = new Date()
        return (
            appointment.date.getDate() >= today.getDate() &&
            (appointment.status == 'rescheduled' ||
                appointment.status == 'upcoming')
        )
    })
    let nextAppointment = appointments.sort((a, b) => a.date - b.date)[0]
    nextAppointment = [
        {
            patientName: nextAppointment.patient_id.name,
            appointmentStartTime: nextAppointment.start_time,
            appointmentEndTime: nextAppointment.end_time,
        },
    ]
    return nextAppointment
}

const getPastWeekAppointments = (appointments) => {
    const pastWeekAppointments = [
        { day: 'Mon', appointments: 0 },
        { day: 'Tue', appointments: 0 },
        { day: 'Wed', appointments: 0 },
        { day: 'Thu', appointments: 0 },
        { day: 'Fri', appointments: 0 },
        { day: 'Sat', appointments: 0 },
        { day: 'Sun', appointments: 0 },
    ]
    if (appointments.length === 0) return pastWeekAppointments
    const today = new Date()
    const pastWeek = new Date(today.setDate(today.getDate() - 7))
    appointments.forEach((appointment) => {
        if (appointment.date > pastWeek && appointment.status == 'completed') {
            const day = appointment.date.getDay()
            pastWeekAppointments[day].appointments += 1
        }
    })
    return pastWeekAppointments
}

const getDoctorStats = (appointments) => {
    let todaysPatients = appointments.filter((appointment) => {
        const today = new Date()
        return (
            appointment.date.getDate() === today.getDate() &&
            appointment.date.getMonth() === today.getMonth() &&
            appointment.date.getFullYear() === today.getFullYear() &&
            (appointment.status == 'completed' ||
                appointment.status == 'upcoming')
        )
    }).length

    let thisMonthsPatients = appointments.filter((appointment) => {
        const today = new Date()
        return (
            appointment.date.getMonth() === today.getMonth() &&
            appointment.date.getFullYear() === today.getFullYear() &&
            (appointment.status == 'completed' ||
                appointment.status == 'upcoming')
        )
    }).length

    let remaingAppointmentsToday = appointments.filter((appointment) => {
        const today = new Date()
        return (
            appointment.date.getDate() === today.getDate() &&
            appointment.date.getMonth() === today.getMonth() &&
            appointment.date.getFullYear() === today.getFullYear() &&
            appointment.status === 'Pending'
        )
    }).length

    let totalRevenueThisMonth = appointments.reduce((total, appointment) => {
        const today = new Date()
        if (
            appointment.date.getMonth() === today.getMonth() &&
            appointment.date.getFullYear() === today.getFullYear()
        )
            return total + appointment.fee
        return total
    }, 0)

    return [
        { title: 'Patients Today', value: todaysPatients },
        {
            title: 'Remaining Appointments Today',
            value: remaingAppointmentsToday,
        },
        { title: 'Total Appointments This Month', value: thisMonthsPatients },
        { title: 'Revenue This Month', value: '$' + totalRevenueThisMonth },
    ]
}

const getLastMessage = (messages, conversations, doctorName) => {
    if (messages.length === 0)
        return [
            {
                senderName: 'No Messages',
            },
        ]
    messages = messages.flat()
    let lastMessage = messages.sort((a, b) => b.createdAt - a.createdAt)[0]

    const membersInfo = conversations.find(
        (conversation) => conversation._id == lastMessage.conversationId
    ).membersInfo

    let senderName = membersInfo[0]
    if (senderName == doctorName) senderName = membersInfo[1]
    lastMessage = [
        {
            senderName: senderName,
            message: lastMessage.text,
        },
    ]
    return lastMessage
}

export {
    createDoctor,
    getDoctors,
    getDoctorById,
    getPatientByDoctorId,
    updateDoctor,
    getAppointmentsByDoctorId,
    getAppointmentsWithNamesByDoctorId,
    getActiveDoctors,
    saveDoctorfiles,
    uploadDoctorFiles,
    updateContract,
    updateTimeSlots,
    getAllMedicines,
    getMedicineByName,
    checkUsernameAvailability,
    checkEmailAvailability,
    editMedicineByName,
    deleteMedicine,
    dashboard,
}
