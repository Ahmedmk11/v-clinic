import express from 'express'
import { createDoctor, getDoctors } from '../controllers/doctorController.js'
const router = express.Router()

router.post('/create-doctor', createDoctor)
router.get('/get-doctors', getDoctors)

export default router
