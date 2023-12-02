import DoctorModel from '../models/doctorModel.js'
import PatientModel from '../models/patientModel.js'
import Medicine from '../models/medicineModel.js'
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
        console.log(req.body)
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

const getAppointmentsByDoctorIdArray = async (req, res) => {
    try {
        let doctor = await DoctorModel.findById(req.params.id)
        if (doctor) {
            // Populate appointments and convert to array
            await doctor.populate('appointments').execPopulate()
            const appointmentsArray = doctor.appointments.map((appointment) =>
                appointment.toObject()
            )
            res.json(appointmentsArray)
        } else {
            res.status(404).json({ message: 'Doctor not found' })
        }
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
        console.log(username)
        const isTaken = await DoctorModel.findOne({ username: username })
        console.log(isTaken)
        if (!isTaken) {
            res.status(202).json({ message: 202 })
        } else {
            res.status(200).json({ message: 200 })
        }
    } catch (error) {
        console.log('hi 500')
        res.status(500).json({ message: error.message })
    }
}

const checkEmailAvailability = async (req, res) => {
    try {
        const { email } = req.params
        console.log(email)
        const isTaken = await DoctorModel.findOne({ email: email })
        console.log(isTaken)
        if (!isTaken) {
            res.status(202).json({ message: 202 })
        } else {
            res.status(200).json({ message: 200 })
        }
    } catch (error) {
        console.log('hi 500')
        res.status(500).json({ message: error.message })
    }
}

export {
    createDoctor,
    getDoctors,
    getDoctorById,
    updateDoctor,
    getAppointmentsByDoctorId,
    getAppointmentsWithNamesByDoctorId,
    getActiveDoctors,
    saveDoctorfiles,
    uploadDoctorFiles,
    updateContract,
    updateTimeSlots,
    getAppointmentsByDoctorIdArray,
    getAllMedicines,
    getMedicineByName,
    checkUsernameAvailability,
    checkEmailAvailability,
}
