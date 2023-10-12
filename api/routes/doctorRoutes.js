import express from 'express'
import {
    createDoctor,
    getDoctors,
    getDoctorById,
    updateDoctor,
    getAppointmentsByDoctorId,
    getAppointmentsWithNamesByDoctorId,
    getActiveDoctors
} from '../controllers/doctorController.js'
const router = express.Router()

router.post('/create-doctor', createDoctor)
router.get('/get-doctors', getDoctors)
router.get('/get-active-doctors', getActiveDoctors)
router.get('/get-doctor/:id', getDoctorById)
router.put('/update-doctor', updateDoctor)
router.get('/get-appointments/:id', getAppointmentsByDoctorId)
router.get('/get-appointments-with-names/:id', getAppointmentsWithNamesByDoctorId)
export default router
