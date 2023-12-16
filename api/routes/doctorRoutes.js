import express from 'express'
import {
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
    getAllMedicines,
    getMedicineByName,
    checkUsernameAvailability,
    checkEmailAvailability,
    getPatientByDoctorId,
    editMedicineByName,
    deleteMedicine,
    dashboard,
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
router.delete('/delete-medication-from-prescription/:id/:medId', deleteMedicine)
router.get('/get-all-medicines', getAllMedicines)
router.get('/get-medicine-by-name/:name', getMedicineByName)
router.post('/upload', saveDoctorfiles, uploadDoctorFiles)
router.put('/update-contract', updateContract)
router.put('/edit-medicine-by-name', editMedicineByName)
router.post('/updateTimeSlots', updateTimeSlots)
router.get('/check-username-taken/:username', checkUsernameAvailability)
router.get('/check-email-taken/:email', checkEmailAvailability)
router.get('/dashboard/:id', dashboard)

export default router
