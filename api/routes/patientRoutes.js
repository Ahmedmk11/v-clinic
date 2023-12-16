import express from 'express'
import bodyParser from 'body-parser'

import {
    createPatient,
    getPatients,
    getPatientByID,
    getPatientsByDoctorID,
    getPatientAppointments,
    getPatientPrescriptions,
    getFamilyMembers,
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
    payAppointmentCard,
    cancelAutoRenewal,
    getFamilyMembersAppointments,
    generatePrescriptionPDF,
    getNotifications,
    removeNotification,
    getPrescriptionPrice,
    checkUsernameAvailability,
    checkEmailAvailability,
    checkPhoneAvailability,
    checkNidAvailability,
} from '../controllers/patientController.js'

const router = express.Router()

router.post('/add-package/:id', addPackage)
router.post('/buy-package-wallet/:id', buyPackageWallet)
router.post('/buy-package-card/:id', packagePayCard)
router.post('/pay-appointment-wallet/:id', payAppointmentWallet)
router.post('/pay-appointment-card/:id', payAppointmentCard)

router.post('/add-medical-history', addMedicalHistory)
router.put('/update-medical-history/:id', updateMedicalHistory)

router.post('/create-patient', createPatient)
router.get('/get-prescription-price/:prescription_id', getPrescriptionPrice)
router.get('/get-patients', getPatients)
router.get('/get-patient-by-id/:id', getPatientByID)
router.get('/get-patients-by-doctor-id/:id', getPatientsByDoctorID)
router.get('/get-patient-appointments/:id', getPatientAppointments)
router.get('/get-family-appointments/:id', getFamilyMembersAppointments)
router.get('/get-patient-prescriptions/:id', getPatientPrescriptions)
router.get('/get-patient-family-members/:id', getFamilyMembers) // unused
router.get('/get-patient-package/:id', getPatientDiscount)
router.post('/add-appointment', addAppointment)
router.post('/upload-health-records', savePatientfiles, uploadPatientFiles)
router.delete('/remove-uploaded-file', removeUploadedFile)
router.post('/add-to-family/:id', addToFamily)
router.get('/get-family/:id', getFamily)
router.get('/check-username-taken/:username', checkUsernameAvailability)
router.get('/check-email-taken/:email', checkEmailAvailability)
router.get('/check-phone-taken/:phone', checkPhoneAvailability)
router.get('/check-nid-taken/:nid', checkNidAvailability)
router.get('/generate-prescription-pdf', generatePrescriptionPDF)
router.get('/get-notifications/:pid', getNotifications) // unused
router.put('/remove-notification/:nid/:id', removeNotification)
router.post(
    '/stripe-webhook',
    bodyParser.raw({ type: 'application/json' }),
    stripeWebhook
)
router.patch('/cancelAutoRenewal', cancelAutoRenewal)
//router.post('/stripe-webhook-appointment', bodyParser.raw({ type: 'application/json' }), stripeWebhookAppointment)

export default router
