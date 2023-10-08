import DoctorModel from '../models/doctorModel.js'

// @desc    Create a doctor
// @route   POST /api/doctors/create-doctor
// @access  Public
const createDoctor = async (req, res) => {
    const {
        username,
        name,
        password,
        email,
        dob,
        hourly_rate,
        affiliation,
        education,
        speciality
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
        speciality
    })
    try {
        await newDoctor.save()
        res.status(201).json(newDoctor)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res) => {
    try {
        const doctors = await DoctorModel.find({})
        res.json(doctors)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// @desc    Get a doctor by id
// @route   GET /api/get-doctor/:id
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
// @route   PUT /api/update-doctor
// @access  Public
const updateDoctor = async (req, res) => {
    try {
        const doctor = await DoctorModel.findById(req.body.id)
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
// @route   GET /api/get-appoinments/:id
// @access  Public
const getAppointmentsByDoctorId = async (req, res) => {
    try {
        let doctor = await DoctorModel.findById(req.params.id)
        if (doctor) {
            doctor = await doctor.populate('appointments')
            res.json(doctor.appointments)
        } else res.status(404).json({ message: 'Doctor not found' })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export {
    createDoctor,
    getDoctors,
    getDoctorById,
    updateDoctor,
    getAppointmentsByDoctorId,
}
