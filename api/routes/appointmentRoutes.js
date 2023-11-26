import express from 'express'
import { cancelAppointmentDoctor,cancelAppointmentPatient ,rescheduleAppointment} from '../controllers/AppointmentController.js'
const router = express.Router()

router.patch('/cancel-appointment-doctor', cancelAppointmentDoctor)
router.patch('/cancel-appointment-patient', cancelAppointmentPatient)

router.patch('/reschedule-appointment', rescheduleAppointment)

export default router