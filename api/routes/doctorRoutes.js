import express from 'express'
import { createDoctor, getDoctors,getDoctorById,updateDoctorById ,getAppointmentsByDoctorId} from '../controllers/doctorController.js'
const router = express.Router()

router.post('/create-doctor', createDoctor)
router.get('/get-doctors', getDoctors)
router.get('/get-doctor/:id', getDoctorById)
router.put('/update-doctor/:id', updateDoctorById)
router.get('/get-appoinments/:id', getAppointmentsByDoctorId)
export default router
