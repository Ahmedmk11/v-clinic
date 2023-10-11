import express from 'express'

import {
    createPatient,
    getPatients,
    getPatientByID,
    getPatientsByDoctorID,
    getPatientAppointments,
    getPatientPrescription,
    getFamilyMembers,
    populateFamilyMembers,
    getPatientDiscount,
    testingAddPackage,
} from '../controllers/patientController.js'

const router = express.Router()

router.post('/create-patient', createPatient)
router.post('/populate-family-members/:id', populateFamilyMembers)
router.post('/add-package-test/:id', testingAddPackage)
router.get('/get-patients', getPatients)
router.get('/get-patient-by-id/:id', getPatientByID)
router.get('/get-patients-by-doctor-id/:id', getPatientsByDoctorID)
router.get('/get-patient-appointments/:id', getPatientAppointments)
router.get('/get-patient-prescription/:id', getPatientPrescription)
router.get('/get-patient-family-members/:id', getFamilyMembers)
router.get('/get-patient-package/:id', getPatientDiscount)

export default router
