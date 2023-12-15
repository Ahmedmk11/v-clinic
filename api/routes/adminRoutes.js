import express, { Router } from 'express'
const router = express.Router()
import adminController from '../controllers/adminController.js'

router.get('/getAllAdmins', adminController.getAllAdmins)
router.get('/getAllDoctors', adminController.getAllDoctors)
router.get('/getAllPatients', adminController.getAllPatients)
router.get('/getUser/:id/:type', adminController.getUser)

router.get('/getAllDoctorRequest', adminController.getAllDoctorRequest)
router.get('/getAllPackages', adminController.getAllPackages)
router.get('/getPackage/:id', adminController.getPackagebyID)
router.post('/addAdmin', adminController.addAdmin)
router.post('/addPackage', adminController.addPackage)
router.put('/updatePackage/:id', adminController.updatePackage)
router.put('/updateDoctorStatus', adminController.updateDoctorStatus)
router.delete('/deleteUser/:id', adminController.removeUser)
router.delete('/deletePackage/:id', adminController.deletePackage)
router.get('/dashboard', adminController.dashboard)
//router.get('/getUsers', )

export default router
