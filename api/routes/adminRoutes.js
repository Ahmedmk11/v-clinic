import express, { Router } from 'express'
const router = express.Router()
import adminController from '../controllers/adminController.js'

router.get('/getAllAdmins', adminController.getAllAdmins)
router.get('/getAllDoctors', adminController.getAllDoctors)
router.get('/getAllPatients', adminController.getAllPatients)
router.get('/getUser/:id', adminController.getUser)
router.get('/getDoctorRequest/:id', adminController.getDoctorRequest)
router.get('/getAllDoctorRequest', adminController.getAllDoctorRequest)
router.post('/addAdmin', adminController.addAdmin)
router.delete('/deleteUser/:id', adminController.removeUser)
//router.get('/getUsers', )




export default router