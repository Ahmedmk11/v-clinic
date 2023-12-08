import express from 'express'
import {
    createDoctor,
    getDoctors,
    getDoctorById,
    updateDoctor,
    getAppointmentsByDoctorId,
    getAppointmentsWithNamesByDoctorId,
    getAppointmentsByDoctorIdArray,
    getActiveDoctors,
    saveDoctorfiles,
    uploadDoctorFiles,
    updateContract,
    updateTimeSlots,
    getAllMedicines,
    getMedicineByName,
    checkUsernameAvailability,
    checkEmailAvailability,
    getPatientByDoctorId,
} from '../controllers/doctorController.js'
const router = express.Router()

router.post('/create-doctor', createDoctor)
router.get('/get-doctors', getDoctors)
router.get('/get-active-doctors', getActiveDoctors)
router.get('/get-doctor/:id', getDoctorById)
router.get('/get-patient/:doctor_id/:patient_id', getPatientByDoctorId)
router.put('/update-doctor', updateDoctor)
router.get('/get-appointments/:id', getAppointmentsByDoctorId)
router.get(
    '/get-appointments-with-names/:id',
    getAppointmentsWithNamesByDoctorId
)

router.get('/get-appointmentstimes/:id', getAppointmentsByDoctorIdArray)
router.get('/get-all-medicines', getAllMedicines)
router.get('/get-medicine-by-name/:name', getMedicineByName)
router.post('/upload', saveDoctorfiles, uploadDoctorFiles)
router.put('/update-contract', updateContract)
router.post('/updateTimeSlots', updateTimeSlots)
router.get('/check-username-taken/:username', checkUsernameAvailability)
router.get('/check-email-taken/:email', checkEmailAvailability)

export default router
