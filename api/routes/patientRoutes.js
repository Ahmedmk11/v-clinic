import express from 'express'

import { createPatient, getPatients } from '../controllers/patientController.js'

const router = express.Router()

router.post('/create-patient', createPatient)
router.get('/get-patients', getPatients)

export default router
