import express from 'express'

import {
    createPatient,
    getPatients,
    getPatientByID,
    getPatientsByDoctorID,
} from '../controllers/patientController.js'

const router = express.Router()

router.post('/create-patient', createPatient)
router.get('/get-patients', getPatients)
router.get('/get-patient-by-id', getPatientByID)
router.get('/get-patients-by-doctor-id', getPatientsByDoctorID)

export default router
