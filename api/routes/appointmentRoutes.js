import express from 'express'
import { cancelAppointmentDoctor,cancelAppointmentPatient ,rescheduleAppointment,requestFollowUp,acceptFollowUp,rejectFollowUp} from '../controllers/AppointmentController.js'
const router = express.Router()

router.patch('/cancel-appointment-doctor', cancelAppointmentDoctor)
router.patch('/cancel-appointment-patient', cancelAppointmentPatient)
router.patch('/reschedule-appointment', rescheduleAppointment)
router.post('/request-follow-up', requestFollowUp)
router.patch('/accept-follow-up', acceptFollowUp)
router.patch('/reject-follow-up', rejectFollowUp)

export default router