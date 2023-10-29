import express from 'express'

import {
    login,
    logout,
    getCurrUser,
    changePassword,
} from '../controllers/authenticationController.js'

const router = express.Router()

router.post('/login', login)
router.post('/logout', logout)
router.get('/get-curr-user', getCurrUser)
router.put('/change-password', changePassword)

export default router
