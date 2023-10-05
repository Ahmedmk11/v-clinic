import Doctor from '../models/doctorModel.js'

const createDoctor = async (req, res) => {
    const {
        username,
        name,
        password,
        email,
        hourly_rate,
        affiliation,
        education,
    } = req.body
    const newDoctor = new Doctor({
        username,
        name,
        password,
        email,
        hourly_rate,
        affiliation,
        education,
    })
    await newDoctor.save()
    res.status(201).json(newDoctor)
}

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res) => {
    const doctors = await Doctor.find({})
    res.json(doctors)
}

export { createDoctor, getDoctors }
