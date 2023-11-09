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
    addPackage,
    addMedicalHistory,
    updateMedicalHistory,
    addAppointment,
    savePatientfiles,
    uploadPatientFiles,
    removeUploadedFile,
    addToFamily,
    getFamily,
    buyPackageWallet,
    packagePayCard,
} from '../controllers/patientController.js'

const router = express.Router()

router.post('/create-patient', createPatient)
router.post('/populate-family-members/:id', populateFamilyMembers)
router.post('/add-package/:id', addPackage)
router.post('/buy-package-wallet/:id', buyPackageWallet)
router.post('/buy-package-card/:id', packagePayCard)
router.get('/get-patients', getPatients)
router.get('/get-patient-by-id/:id', getPatientByID)
router.get('/get-patients-by-doctor-id/:id', getPatientsByDoctorID)
router.get('/get-patient-appointments/:id', getPatientAppointments)
router.get('/get-patient-prescription/:id', getPatientPrescription)
router.get('/get-patient-family-members/:id', getFamilyMembers)
router.get('/get-patient-package/:id', getPatientDiscount)
router.post('/add-medical-history', addMedicalHistory)
router.put('/update-medical-history/:id', updateMedicalHistory)
router.post('/add-appointment', addAppointment)
router.post('/upload-health-records', savePatientfiles, uploadPatientFiles)
router.delete('/remove-uploaded-file', removeUploadedFile)
router.post('/add-to-family/:id', addToFamily)
router.get('/get-family/:id', getFamily)

export default router
