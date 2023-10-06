import express from 'express'
import { createDoctor, getDoctors,getDoctorById,updateDoctor ,getAppointmentsByDoctorId} from '../controllers/doctorController.js'
const router = express.Router()

router.post('/create-doctor', createDoctor)
router.get('/get-doctors', getDoctors)
router.get('/get-doctor/:id', getDoctorById)
router.put('/update-doctor', updateDoctor)
router.get('/get-appoinments/:id', getAppointmentsByDoctorId)
export default router
