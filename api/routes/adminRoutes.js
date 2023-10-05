import express from 'express'
const router = express.Router()
import adminController from '../controllers/adminController.js'


router.post('/addAdmin', adminController.addAdmin)
router.get('/getUser/:id', adminController.getUser)
//router.get('/getUsers', )




export default router