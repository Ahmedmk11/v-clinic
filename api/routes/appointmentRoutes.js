import express from 'express'
import {
    cancelAppointmentDoctor,
    cancelAppointmentPatient,
    rescheduleAppointment,
    requestFollowUp,
    acceptFollowUp,
    rejectFollowUp,
    updatePrescription,
    getPrescription,
} from '../controllers/appointmentController.js'
const router = express.Router()

router.patch('/cancel-appointment-doctor', cancelAppointmentDoctor)
router.patch('/cancel-appointment-patient', cancelAppointmentPatient)
router.patch('/reschedule-appointment', rescheduleAppointment)
router.post('/request-follow-up', requestFollowUp)
router.post('/update-prescription', updatePrescription)
router.get('/get-prescription/:id', getPrescription)
router.patch('/accept-follow-up', acceptFollowUp)
router.patch('/reject-follow-up', rejectFollowUp)

export default router
