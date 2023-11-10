import express from 'express'
import bodyParser from 'body-parser';

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
    stripeWebhook,
    payAppointmentWallet,
    payAppointmentCard
} from '../controllers/patientController.js'

let packagePaymentDone = false
const router = express.Router()

router.post('/create-patient', createPatient)
router.post('/populate-family-members/:id', populateFamilyMembers)
router.post('/add-package/:id', addPackage)
router.post('/buy-package-wallet/:id', buyPackageWallet)
router.post('/buy-package-card/:id', packagePayCard)
router.post('/pay-appointment-wallet/:id', payAppointmentWallet)
router.post('/pay-appointment-card/:id', payAppointmentCard)
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
router.post('/stripe-webhook', bodyParser.raw({ type: 'application/json' }), stripeWebhook)
//router.post('/stripe-webhook-appointment', bodyParser.raw({ type: 'application/json' }), stripeWebhookAppointment)



export default router
